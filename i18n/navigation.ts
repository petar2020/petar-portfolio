import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

// Re-export next-intl navigation helpers (client-safe)
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, defaultLocale });

// Re-export config values for convenience
export { locales, defaultLocale };
