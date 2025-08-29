'use client';
import {useEffect, useRef, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useRouter, usePathname} from '../i18n/navigation';
import {locales, defaultLocale} from '../i18n/navigation';

export default function LanguageSwitcher({scrolled = false}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const languages = [
    {code: 'sr', name: 'Srpski', flag: '🇷🇸'},
    {code: 'en', name: 'English', flag: '🇺🇸'}
  ];

  const currentLocale =
    locales.find((l) => pathname.startsWith(`/${l}`)) || defaultLocale;
  const currentLanguage =
    languages.find((l) => l.code === currentLocale) || languages[0];

  const changeLanguage = (newLocale) => {
    setOpen(false);
    const currentPath = pathname.replace(`/${currentLocale}`, '') || '/';
    router.push(currentPath, {locale: newLocale});
    if (typeof window !== 'undefined' && window.trackLanguageChange) {
      window.trackLanguageChange(currentLocale, newLocale);
    }
  };

  // close on click outside / escape
  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const pillBg = scrolled
    ? 'bg-gray-100/70 dark:bg-gray-800/70 border-gray-300/50 dark:border-gray-600/40'
    : 'bg-white/15 border-white/25';

  return (
    <div ref={ref} className="relative z-50">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-md
                    text-sm font-semibold text-white/90 hover:text-white
                    shadow-sm hover:shadow transition ${pillBg}`}
        whileHover={{scale: 1.03}}
        whileTap={{scale: 0.97}}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Choose language"
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span>{currentLanguage.code.toUpperCase()}</span>
        <svg
          className="w-4 h-4 opacity-90"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{opacity: 0, y: -6, scale: 0.98}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: -6, scale: 0.98}}
            transition={{duration: 0.16}}
            className={`absolute right-0 mt-2 w-44 rounded-xl border backdrop-blur-md shadow-2xl overflow-hidden
                        bg-white/12 border-white/20`}
          >
            {languages.map((lang, i) => {
              const active = lang.code === currentLocale;
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={active}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left
                              text-white/90 hover:text-white transition
                              ${active ? 'bg-white/15' : 'hover:bg-white/10'}
                              ${i === 0 ? 'rounded-t-xl' : ''} ${i === languages.length - 1 ? 'rounded-b-xl' : ''}`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                  {active && (
                    <span className="ml-auto inline-flex h-2.5 w-2.5 rounded-full bg-sky-400" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
