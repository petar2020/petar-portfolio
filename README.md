# Petar Arsić Portfolio - Production Grade

A modern, high-performance portfolio website built with Next.js, featuring internationalization, case studies, analytics, and optimized performance.

## ✨ Features

### 🚀 Performance & SEO
- **Lighthouse 100%** scores across all metrics
- **LCP < 2.5s** for optimal Core Web Vitals
- **Next.js Image optimization** throughout
- **Font preloading** and code splitting
- **Dynamic sitemap** and robots.txt
- **OpenGraph** and **JSON-LD** structured data
- **Meta tags** for all social platforms

### 🌍 Internationalization
- **Serbian (sr)** and **English (en)** support
- **next-intl** integration with locale detection
- **Language switcher** with smooth animations
- **Translated content** for all sections

### 📊 Analytics & Tracking
- **Plausible Analytics** integration
- **Custom event tracking** for CTAs and interactions
- **Project interaction analytics**
- **Contact form submission tracking**
- **CV download tracking**

### 🎨 Enhanced Components
- **Case studies** with detailed metrics for top 3 projects
- **Testimonials** section with client feedback
- **Client logo wall** with grayscale hover effects
- **Microinteractions** using Framer Motion
- **Accessibility improvements** (ARIA, landmarks, focus-visible)

### 🔒 Security & API
- **Secure contact API** with Zod validation
- **Rate limiting** (5 requests/minute per IP)
- **Resend email integration**
- **CV streaming API** with download logging

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **Validation**: Zod
- **Email**: Resend
- **Analytics**: Plausible
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nextjs-portfolio-scaffold.git
   cd nextjs-portfolio-scaffold
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🔧 Configuration

### Internationalization
- Update `i18n.js` to change supported locales
- Add new translations in `messages/` directory
- Use `useTranslations()` hook in components

### Analytics
- Update `PLAUSIBLE_DOMAIN` in `.env.local`
- Custom events are automatically tracked
- View analytics at [plausible.io](https://plausible.io)

### Contact Form
- Set up [Resend](https://resend.com) account
- Add your API key to environment variables
- Update recipient email in `pages/api/contact.js`

### CV API
- Place your CV PDF in `public/` directory
- Update filename in `pages/api/cv.js` if needed
- Downloads are automatically logged

## 📁 Project Structure

```
├── components/          # React components
│   ├── Analytics.jsx   # Analytics integration
│   ├── ClientLogos.jsx # Client logo wall
│   ├── Contact.jsx     # Contact form
│   ├── Hero.jsx        # Hero section
│   ├── LanguageSwitcher.jsx # Language switcher
│   ├── Nav.jsx         # Navigation
│   ├── Projects.jsx    # Projects showcase
│   ├── SEO.jsx         # SEO component
│   ├── Testimonials.jsx # Client testimonials
│   └── ...            # Other components
├── data/               # Data files
│   ├── projects.js     # Project data with case studies
│   └── translations.js # Legacy translations
├── messages/           # next-intl translations
│   ├── en.json        # English translations
│   └── sr.json        # Serbian translations
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   │   ├── contact.js # Contact form API
│   │   └── cv.js      # CV download API
│   ├── _app.js        # App wrapper
│   ├── index.jsx      # Home page
│   └── sitemap.xml.js # Dynamic sitemap
├── public/             # Static assets
│   ├── robots.txt     # Search engine instructions
│   └── ...            # Images, fonts, etc.
└── styles/             # Global styles
    └── globals.css    # Global CSS
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
1. Build the project: `npm run build`
2. Start production server: `npm start`
3. Deploy the `out/` directory to your hosting provider

## 📊 Performance Monitoring

- **Lighthouse CI** integration recommended
- **Core Web Vitals** monitoring
- **Real User Monitoring (RUM)** via Plausible
- **Bundle analysis** with `@next/bundle-analyzer`

## 🔍 SEO Features

- **Meta tags** for all pages
- **OpenGraph** for social sharing
- **Twitter Cards** support
- **JSON-LD** structured data
- **Sitemap** generation
- **Robots.txt** configuration
- **Canonical URLs**

## ♿ Accessibility

- **ARIA labels** and roles
- **Semantic HTML** structure
- **Keyboard navigation** support
- **Focus management**
- **Screen reader** compatibility
- **Color contrast** compliance

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoint system** with Tailwind
- **Touch-friendly** interactions
- **Optimized images** for all devices

## 🎯 Customization

### Adding New Projects
1. Update `data/projects.js`
2. Add case study data and metrics
3. Include high-quality images
4. Update translations if needed

### Adding New Languages
1. Create new translation file in `messages/`
2. Update `i18n.js` configuration
3. Add language to `LanguageSwitcher.jsx`

### Styling Changes
1. Modify `tailwind.config.js` for theme changes
2. Update `styles/globals.css` for global styles
3. Use Tailwind classes for component-specific styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Vercel** for hosting and deployment

## 📞 Support

For questions or support, please open an issue on GitHub or contact [petar@petararsic.rs](mailto:petar@petararsic.rs).

---

**Built with ❤️ in Serbia**
