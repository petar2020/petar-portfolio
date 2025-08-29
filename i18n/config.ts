// ESM config for middleware and other ESM contexts
export const locales = ['sr', 'en'] as const;
export const defaultLocale = 'sr' as const;

export type Locale = typeof locales[number];
