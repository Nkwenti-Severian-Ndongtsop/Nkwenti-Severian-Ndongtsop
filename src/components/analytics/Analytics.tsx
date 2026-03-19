import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsProps {
  plausibleDomain?: string;
  customDomain?: string;
}

declare global {
  interface Window {
    plausible?: (event: string, params?: { props?: Record<string, any>; callback?: () => void }) => void;
  }
}

const Analytics = ({ 
  plausibleDomain = 'nkwenti-severian-ndongtsop.vercel.app',
  customDomain 
}: AnalyticsProps) => {
  const location = useLocation();

  useEffect(() => {
    // Only load analytics in production
    if (process.env.NODE_ENV !== 'production') {
      console.log('Analytics disabled in development mode');
      return;
    }

    // Load Plausible Analytics script
    const script = document.createElement('script');
    script.src = 'https://plausible.io/js/pa-DNqZ1q8GPlR5n-3Gr2tm4.js';
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);

    // Initialize Plausible
    const initScript = document.createElement('script');
    initScript.textContent = `
      window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
      plausible.init()
    `;
    document.head.appendChild(initScript);

    // Track page view
    const trackPageView = () => {
      if (window.plausible) {
        window.plausible('pageview', {
          props: {
            path: location.pathname,
            title: document.title,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            screen: `${screen.width}x${screen.height}`,
            language: navigator.language,
            timestamp: new Date().toISOString()
          }
        });
      }
    };

    // Track initial page view
    setTimeout(trackPageView, 100);

    // Track page changes for SPA
    const handleRouteChange = () => {
      setTimeout(trackPageView, 100);
    };

    return () => {
      // Cleanup scripts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      if (document.head.contains(initScript)) {
        document.head.removeChild(initScript);
      }
    };
  }, [plausibleDomain, customDomain, location.pathname]);

  return null;
};

// Custom hook for tracking events
export const useAnalytics = () => {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Analytics Event:', eventName, properties);
      return;
    }

    if (window.plausible) {
      window.plausible(eventName, {
        props: {
          ...properties,
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
          userAgent: navigator.userAgent
        }
      });
    }
  };

  const trackButtonClick = (buttonName: string, location: string) => {
    trackEvent('ButtonClick', {
      button: buttonName,
      location: location,
      category: 'User Interaction'
    });
  };

  const trackProjectView = (projectName: string, projectUrl?: string) => {
    trackEvent('ProjectView', {
      project: projectName,
      projectUrl: projectUrl,
      category: 'Portfolio'
    });
  };

  const trackSkillView = (skillName: string, proficiency: number) => {
    trackEvent('SkillView', {
      skill: skillName,
      proficiency: proficiency,
      category: 'Skills'
    });
  };

  const trackContactForm = (action: 'view' | 'submit' | 'error', method?: string) => {
    trackEvent('ContactForm', {
      action: action,
      method: method,
      category: 'Conversion'
    });
  };

  const trackChatInteraction = (action: 'open' | 'message' | 'suggestion_click', messageLength?: number) => {
    trackEvent('ChatInteraction', {
      action: action,
      messageLength: messageLength,
      category: 'AI Chat'
    });
  };

  const trackDownload = (fileName: string, fileType: string) => {
    trackEvent('Download', {
      fileName: fileName,
      fileType: fileType,
      category: 'Resources'
    });
  };

  const trackSocialClick = (platform: string, url: string) => {
    trackEvent('SocialClick', {
      platform: platform,
      url: url,
      category: 'Social Media'
    });
  };

  const trackSearch = (query: string, resultsCount?: number) => {
    trackEvent('Search', {
      query: query,
      resultsCount: resultsCount,
      category: 'Search'
    });
  };

  const trackError = (errorType: string, errorMessage?: string, context?: string) => {
    trackEvent('Error', {
      errorType: errorType,
      errorMessage: errorMessage,
      context: context,
      category: 'Errors'
    });
  };

  return {
    trackEvent,
    trackButtonClick,
    trackProjectView,
    trackSkillView,
    trackContactForm,
    trackChatInteraction,
    trackDownload,
    trackSocialClick,
    trackSearch,
    trackError
  };
};

// Conversion tracking component
export const ConversionTracker = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track time on page
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
      trackEvent('TimeOnPage', {
        duration: timeOnPage,
        category: 'Engagement'
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [trackEvent]);

  // Track scroll depth
  useEffect(() => {
    let maxScroll = 0;
    
    const handleScroll = () => {
      const scrollPercentage = Math.floor(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      maxScroll = Math.max(maxScroll, scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (maxScroll > 0) {
        trackEvent('ScrollDepth', {
          depth: maxScroll,
          category: 'Engagement'
        });
      }
    };
  }, [trackEvent]);

  return null;
};

export default Analytics;
