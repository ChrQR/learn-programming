export interface RunRequest {
	type: 'run';
	id: number;
	code: string;
	check?: string;
	files?: Record<string, string>;
}

export type WorkerMessage =
	| { type: 'status'; key: 'downloading' }
	| { type: 'ready'; pyodideVersion: string; pythonVersion: string }
	| { type: 'fatal'; text: string }
	| { type: 'out'; id: number; text: string }
	| { type: 'err'; id: number; text: string }
	| { type: 'done'; id: number; ok: boolean; check?: { ok: boolean; msg: string }; error?: string };
