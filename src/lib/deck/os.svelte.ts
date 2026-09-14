export type Os = 'linux' | 'macos' | 'windows';

export const os = $state<{ current: Os }>({ current: 'linux' });

export const osLabel: Record<Os, string> = {
	linux: 'Linux',
	macos: 'macOS',
	windows: 'Windows'
};

/** Guess the visitor's OS once, so the tabs start on the right one. */
export function detectOs() {
	if (typeof navigator === 'undefined') return;
	const ua = navigator.userAgent;
	if (/Windows/i.test(ua)) os.current = 'windows';
	else if (/Mac OS|Macintosh/i.test(ua)) os.current = 'macos';
	else os.current = 'linux';
}
