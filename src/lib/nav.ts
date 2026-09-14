import type { Pathname } from '$app/types';
import type { Msg } from './i18n.svelte';

export type Link = { href: Pathname; label: Msg };

export const sections: Link[] = [
	{ href: '/', label: { en: 'Intro', da: 'Intro' } },
	{ href: '/setup', label: { en: 'Setup', da: 'Opsætning' } },
	{ href: '/project', label: { en: 'First project', da: 'Første projekt' } },
	{ href: '/lessons', label: { en: 'Lessons', da: 'Lektioner' } }
];

export interface Lesson {
	slug: string;
	href: Pathname;
	title: Msg;
	emoji: string;
	blurb: Msg;
}

export const lessons: Lesson[] = [
	{
		slug: 'variables',
		href: '/lessons/variables',
		title: { en: 'Variables', da: 'Variabler' },
		emoji: '📦',
		blurb: {
			en: 'Give names to values so you can use them again.',
			da: 'Giv værdier et navn, så du kan bruge dem igen.'
		}
	},
	{
		slug: 'constants',
		href: '/lessons/constants',
		title: { en: 'Constants', da: 'Konstanter' },
		emoji: '🔒',
		blurb: { en: 'Values that should never change.', da: 'Værdier, der aldrig må ændre sig.' }
	},
	{
		slug: 'types',
		href: '/lessons/types',
		title: { en: 'Types', da: 'Typer' },
		emoji: '🏷️',
		blurb: {
			en: 'Text, numbers, and true/false, and why it matters.',
			da: 'Tekst, tal og sandt/falsk, og hvorfor det betyder noget.'
		}
	},
	{
		slug: 'operators',
		href: '/lessons/operators',
		title: { en: 'Operators & decisions', da: 'Operatorer og beslutninger' },
		emoji: '🧮',
		blurb: { en: 'Math, comparisons, and if/else.', da: 'Regning, sammenligninger og if/else.' }
	},
	{
		slug: 'loops',
		href: '/lessons/loops',
		title: { en: 'Loops', da: 'Løkker' },
		emoji: '🔁',
		blurb: {
			en: 'Do something many times without repeating yourself.',
			da: 'Gør noget mange gange uden at gentage dig selv.'
		}
	},
	{
		slug: 'functions',
		href: '/lessons/functions',
		title: { en: 'Functions', da: 'Funktioner' },
		emoji: '🧰',
		blurb: { en: 'Make your own commands.', da: 'Lav dine egne kommandoer.' }
	},
	{
		slug: 'project-structure',
		href: '/lessons/project-structure',
		title: { en: 'Project structure', da: 'Projektstruktur' },
		emoji: '🗂️',
		blurb: {
			en: 'How a modern Python project is organized.',
			da: 'Sådan er et moderne Python-projekt organiseret.'
		}
	}
];

export function lessonLinks(slug: string): { prev: Link; next: Link } {
	const i = lessons.findIndex((l) => l.slug === slug);
	const p = lessons[i - 1];
	const n = lessons[i + 1];
	return {
		prev: p
			? { href: p.href, label: p.title }
			: { href: '/lessons', label: { en: 'Lessons', da: 'Lektioner' } },
		next: n
			? { href: n.href, label: { en: `Next: ${n.title.en}`, da: `Næste: ${n.title.da}` } }
			: { href: '/lessons', label: { en: 'All lessons', da: 'Alle lektioner' } }
	};
}
