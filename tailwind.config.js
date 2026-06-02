// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Control-surface tokens ───────────────────────────────
        ink: {
          DEFAULT: '#06100E', // page base — near-black, faint teal tint
          900: '#06100E',
          850: '#0A1614', // raised sections
          800: '#0E1D1A', // cards / readouts
          700: '#142B27', // hairline-adjacent fills
        },
        teal: {
          DEFAULT: '#0E8C82', // structural brand hue
          bright: '#2DD4BF', // active / "on-time" signal
          deep: '#0A4F4A',
          500: '#0E8C82',
          600: '#0A6F67',
        },
        amber: {
          DEFAULT: '#F6A623', // the single sharp accent — CTA / live
          bright: '#FFC24B',
          500: '#F6A623',
          600: '#D98E15',
        },
        signal: {
          danger: '#E5575C', // muted "Problem" markers only
        },
        // text tokens
        paper: '#E7F1EE',
        'paper-dim': '#9BB3AE',
        'paper-faint': '#6D8A84',
        // hairline
        line: 'rgba(64,160,150,0.18)',
        'line-strong': 'rgba(64,160,150,0.34)',

        // ── Repoint legacy aliases onto the new palette so existing
        //    `primary/secondary/accent` classes de-blue automatically ──
        primary: '#0E8C82',
        secondary: '#0A6F67',
        accent: '#F6A623',
        bgLight: '#0A1614',
        bgDark: '#06100E',
      },
      fontFamily: {
        sans: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        // sharp instrument-panel corners
        DEFAULT: '2px',
        sm: '1px',
        md: '3px',
        lg: '4px',
        xl: '6px',
        '2xl': '8px',
        '3xl': '10px',
      },
      letterSpacing: {
        label: '0.18em',
      },
      boxShadow: {
        panel: '0 1px 0 rgba(255,255,255,0.02) inset, 0 20px 50px -30px rgba(0,0,0,0.8)',
        lift: '0 30px 60px -30px rgba(0,0,0,0.85)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        marquee: 'marquee 40s linear infinite',
        flap: 'flap 0.42s cubic-bezier(0.36,0,0.06,1) both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        flap: {
          '0%': { transform: 'rotateX(90deg)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
