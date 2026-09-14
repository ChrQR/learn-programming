// Main-thread side of the Python runtime: owns the worker and exposes
// reactive status so every code block can show "Loading Python…".

import type { RunRequest, WorkerMessage } from './protocol';

export type RunResult = { ok: boolean; check?: { ok: boolean; msg: string }; stopped?: boolean };

type Handlers = {
	onOut: (text: string) => void;
	onErr: (text: string) => void;
	resolve: (r: RunResult) => void;
};

export const runtime = $state({
	status: 'idle' as 'idle' | 'loading' | 'ready' | 'running' | 'error',
	/** Set while loading or on error; shown to the learner. */
	message: { en: '', da: '' },
	pythonVersion: ''
});

let worker: Worker | undefined;
let nextId = 1;
let current: { id: number; handlers: Handlers } | undefined;

function spawn() {
	worker = new Worker(new URL('./pyodide.worker.ts', import.meta.url), { type: 'module' });
	runtime.status = 'loading';
	runtime.message = { en: 'Starting Python…', da: 'Starter Python…' };
	worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
		const msg = e.data;
		switch (msg.type) {
			case 'status':
				runtime.message = { en: 'Downloading Python…', da: 'Henter Python…' };
				break;
			case 'ready':
				runtime.status = 'ready';
				runtime.pythonVersion = msg.pythonVersion;

				break;
			case 'fatal':
				runtime.status = 'error';
				runtime.message = {
					en: `Could not load Python: ${msg.text}`,
					da: `Kunne ikke hente Python: ${msg.text}`
				};
				break;
			case 'out':
				if (current?.id === msg.id) current.handlers.onOut(msg.text);
				break;
			case 'err':
				if (current?.id === msg.id) current.handlers.onErr(msg.text);
				break;
			case 'done':
				if (current?.id === msg.id) {
					if (msg.error) current.handlers.onErr(msg.error + '\n');
					current.handlers.resolve({ ok: msg.ok, check: msg.check });
					current = undefined;
				}
				runtime.status = 'ready';
				break;
		}
	};
	worker.onerror = (e) => {
		runtime.status = 'error';
		runtime.message = {
			en: `Python worker failed: ${e.message}`,
			da: `Python-processen fejlede: ${e.message}`
		};
	};
}

/** Start downloading Python in the background (call when a code block appears). */
export function preload() {
	if (typeof window === 'undefined') return;
	if (!worker) spawn();
}

export function run(req: Omit<RunRequest, 'type' | 'id'>, handlers: Omit<Handlers, 'resolve'>) {
	preload();
	if (current) {
		return Promise.resolve<RunResult>({ ok: false, stopped: true });
	}
	const id = nextId++;
	runtime.status = runtime.status === 'ready' ? 'running' : runtime.status;
	return new Promise<RunResult>((resolve) => {
		current = { id, handlers: { ...handlers, resolve } };
		worker!.postMessage({ type: 'run', id, ...req } satisfies RunRequest);
	});
}

export function isBusy() {
	return current !== undefined;
}

/** Kill the current program (and the worker with it), then start a fresh one. */
export function stop() {
	if (!worker) return;
	worker.terminate();
	worker = undefined;
	const pending = current;
	current = undefined;
	spawn();
	pending?.handlers.onErr('⏹ Stopped / Stoppet.\n');
	pending?.handlers.resolve({ ok: false, stopped: true });
}
