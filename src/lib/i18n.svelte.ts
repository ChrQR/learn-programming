// Tiny language switch: everything on the site exists in English and Danish.

export type Lang = 'en' | 'da';
export type Msg = { en: string; da: string };

export const i18n = $state<{ lang: Lang }>({ lang: 'en' });

/** Pick the string for the current language. Reactive when called in a template or $derived. */
export function t(en: string, da: string): string {
	return i18n.lang === 'da' ? da : en;
}

/** Pick the value for the current language from an {en, da} object. */
export function L<T>(m: { en: T; da: T }): T {
	return m[i18n.lang];
}

export function setLang(lang: Lang) {
	i18n.lang = lang;
	try {
		localStorage.setItem('lang', lang);
	} catch {
		/* storage unavailable */
	}
	document.documentElement.lang = lang;
}

/** Restore the saved choice, or guess from the browser language. */
export function initLang() {
	let lang: Lang | null = null;
	try {
		const saved = localStorage.getItem('lang');
		if (saved === 'en' || saved === 'da') lang = saved;
	} catch {
		/* storage unavailable */
	}
	if (!lang) lang = navigator.language?.toLowerCase().startsWith('da') ? 'da' : 'en';
	i18n.lang = lang;
	document.documentElement.lang = lang;
}
