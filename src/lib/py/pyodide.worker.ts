/// <reference lib="webworker" />
// Runs Python in a Web Worker via Pyodide (loaded from the jsDelivr CDN).
// Keeping it off the main thread means an infinite loop can be stopped by
// terminating the worker instead of freezing the page.

import type { RunRequest, WorkerMessage } from './protocol';

const PYODIDE_VERSION = '314.0.6';
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

const HARNESS = `
import builtins, importlib, json, linecache, sys, traceback

def _no_input(prompt=""):
    raise RuntimeError("input() does not work in the browser, try it in Zed instead! / input() virker ikke i browseren, prøv det i Zed i stedet!")

builtins.input = _no_input

def _remember_source(filename, code):
    linecache.cache[filename] = (len(code), None, code.splitlines(True), filename)

def run_user(code, ns, module_names):
    for name in module_names:
        sys.modules.pop(name, None)
    importlib.invalidate_caches()
    _remember_source("main.py", code)
    try:
        exec(compile(code, "main.py", "exec"), ns)
    except SystemExit:
        pass
    except BaseException as e:
        tb = e.__traceback__
        tb = tb.tb_next if tb else None
        sys.stderr.write("".join(traceback.format_exception(type(e), e, tb)))
        return False
    finally:
        sys.stdout.flush()
        sys.stderr.flush()
    return True

def run_check(code, ns, output, source):
    ns["__output__"] = output
    ns["__source__"] = source
    try:
        exec(compile(code, "check.py", "exec"), ns)
    except AssertionError as e:
        return json.dumps({"ok": False, "msg": str(e) or "Not quite yet. Read the task again and try once more."})
    except BaseException as e:
        return json.dumps({"ok": False, "msg": f"{type(e).__name__}: {e}"})
    finally:
        sys.stdout.flush()
    return json.dumps({"ok": True, "msg": ""})
`;

// Minimal typing for the parts of Pyodide we use.
interface PyProxy {
	(...args: unknown[]): unknown;
	set(key: string, value: unknown): void;
	destroy(): void;
}

interface Pyodide {
	version: string;
	globals: { get(name: string): PyProxy };
	runPython(code: string): unknown;
	setStdout(opts: { batched: (line: string) => void }): void;
	setStderr(opts: { batched: (line: string) => void }): void;
	FS: { writeFile(path: string, data: string): void; mkdirTree(path: string): void };
}

const post = (msg: WorkerMessage) => self.postMessage(msg);

const ready: Promise<Pyodide> = (async () => {
	post({ type: 'status', key: 'downloading' });
	const mod: { loadPyodide(opts: { indexURL: string }): Promise<Pyodide> } = await import(
		/* @vite-ignore */ `${INDEX_URL}pyodide.mjs`
	);
	const pyodide: Pyodide = await mod.loadPyodide({ indexURL: INDEX_URL });
	pyodide.runPython(HARNESS);
	const pythonVersion = pyodide.runPython(
		'import sys; f"{sys.version_info.major}.{sys.version_info.minor}"'
	) as string;
	post({ type: 'ready', pyodideVersion: pyodide.version, pythonVersion });
	return pyodide;
})();

ready.catch((err) => post({ type: 'fatal', text: String(err?.message ?? err) }));

self.onmessage = async (event: MessageEvent<RunRequest>) => {
	const req = event.data;
	if (req.type !== 'run') return;
	const pyodide = await ready;

	let output = '';
	pyodide.setStdout({
		batched: (line) => {
			output += line + '\n';
			post({ type: 'out', id: req.id, text: line + '\n' });
		}
	});
	pyodide.setStderr({ batched: (line) => post({ type: 'err', id: req.id, text: line + '\n' }) });

	const moduleNames: string[] = [];
	for (const [path, content] of Object.entries(req.files ?? {})) {
		const dir = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
		if (dir) pyodide.FS.mkdirTree(dir);
		pyodide.FS.writeFile(path, content);
		if (path.endsWith('.py')) {
			const mod = path
				.replace(/\.py$/, '')
				.replace(/\/__init__$/, '')
				.replaceAll('/', '.');
			moduleNames.push(mod);
		}
	}

	const ns = pyodide.globals.get('dict')() as PyProxy;
	ns.set('__name__', '__main__');
	try {
		const ok = pyodide.globals.get('run_user')(req.code, ns, moduleNames) as boolean;
		let check: { ok: boolean; msg: string } | undefined;
		if (ok && req.check) {
			check = JSON.parse(
				pyodide.globals.get('run_check')(req.check, ns, output, req.code) as string
			);
		}
		post({ type: 'done', id: req.id, ok, check });
	} catch (err) {
		post({ type: 'done', id: req.id, ok: false, check: undefined, error: String(err) });
	} finally {
		ns.destroy();
	}
};
