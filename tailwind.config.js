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
        // ── Gallery-light surface tokens (semantics unchanged:
        //    ink = surfaces, paper = foreground text) ─────────────
        ink: {
          DEFAULT: '#F7F3EC', // page base — warm off-white
          900: '#F7F3EC',
          850: '#F0E9DD', // raised sections — sand-tinted
          800: '#FFFFFF', // cards / readouts — pure white
          700: '#E8E0D0', // hover fills
        },
        teal: {
          DEFAULT: '#0E7C72', // structural brand hue
          bright: '#0A6E63', // links / active — AA on white
          deep: '#A9CFC7', // muted tints, idle dots
          500: '#0E7C72',
          600: '#0A6E63',
        },
        amber: {
          DEFAULT: '#F0500F', // the single sharp accent — vivid flame orange
          bright: '#D6420A',
          500: '#F0500F',
          600: '#D6420A',
        },
        signal: {
          danger: '#B93A3F', // muted "Problem" markers only
        },
        // text tokens
        paper: '#1A1512',
        'paper-dim': '#59524A',
        'paper-faint': '#837A6F',
        // hairline
        line: 'rgba(26,21,18,0.12)',
        'line-strong': 'rgba(26,21,18,0.26)',

        // ── Repoint legacy aliases onto the new palette so existing
        //    `primary/secondary/accent` classes follow automatically ──
        primary: '#0E7C72',
        secondary: '#0A6E63',
        accent: '#F0500F',
        bgLight: '#FFFFFF',
        bgDark: '#F0E9DD',
      },
      fontFamily: {
        sans: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        script: ['var(--font-script)', 'cursive'],
      },
      borderRadius: {
        // soft studio corners
        DEFAULT: '6px',
        sm: '4px',
        md: '8px',
        lg: '10px',
        xl: '14px',
        '2xl': '18px',
        '3xl': '24px',
      },
      letterSpacing: {
        label: '0.18em',
      },
      boxShadow: {
        panel: '0 1px 2px rgba(20,42,36,0.04), 0 20px 44px -28px rgba(20,42,36,0.18)',
        lift: '0 24px 48px -24px rgba(20,42,36,0.25)',
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
