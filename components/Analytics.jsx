import { useEffect } from 'react';
import { usePathname } from '../i18n/navigation';

// Plausible Analytics
const PLAUSIBLE_DOMAIN = 'petararsic.rs';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Plausible
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible = window.plausible || function() {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
    }

    // Track page views
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('pageview', { props: { url: pathname } });
    }
  }, [pathname]);

  // Track custom events
  const trackEvent = (eventName, props = {}) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(eventName, { props });
    }
  };

  // Track CTA clicks
  const trackCTA = (ctaType, location) => {
    trackEvent('CTA Clicked', {
      cta_type: ctaType,
      location,
      timestamp: new Date().toISOString()
    });
  };

  // Track project interactions
  const trackProjectInteraction = (projectName, interactionType) => {
    trackEvent('Project Interaction', {
      project_name: projectName,
      interaction_type: interactionType,
      timestamp: new Date().toISOString()
    });
  };

  // Track CV downloads
  const trackCVDownload = () => {
    trackEvent('CV Downloaded', {
      timestamp: new Date().toISOString()
    });
  };

  // Track contact form submissions
  const trackContactSubmission = (success) => {
    trackEvent('Contact Form Submitted', {
      success,
      timestamp: new Date().toISOString()
    });
  };

  // Track language changes
  const trackLanguageChange = (fromLang, toLang) => {
    trackEvent('Language Changed', {
      from_language: fromLang,
      to_language: toLang,
      timestamp: new Date().toISOString()
    });
  };

  // Expose tracking functions globally for use in other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.trackEvent = trackEvent;
      window.trackCTA = trackCTA;
      window.trackProjectInteraction = trackProjectInteraction;
      window.trackCVDownload = trackCVDownload;
      window.trackContactSubmission = trackContactSubmission;
      window.trackLanguageChange = trackLanguageChange;
    }
  }, []);

  return null; // This component doesn't render anything
}

// Plausible script loader
export function PlausibleScript() {
  return (
    <>
      <script
        defer
        data-domain={PLAUSIBLE_DOMAIN}
        src="https://plausible.io/js/script.js"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.plausible = window.plausible || function() {
              (window.plausible.q = window.plausible.q || []).push(arguments);
            };
          `
        }}
      />
    </>
  );
}
