// ESM config for middleware and other ESM contexts
export const locales = ['sr', 'en'] as const;
export const defaultLocale = 'en' as const;

export type Locale = typeof locales[number];
