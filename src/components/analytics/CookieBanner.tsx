import { useState, useEffect } from 'react';
import { X, Cookie, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieBanner = () => {
  // Initialize state from localStorage to avoid setState in effect
  const getInitialConsent = () => {
    if (typeof window === 'undefined') return false;
    const consent = localStorage.getItem('analytics-consent');
    return consent === 'accepted';
  };

  const getInitialVisibility = () => {
    if (typeof window === 'undefined') return false;
    const consent = localStorage.getItem('analytics-consent');
    return !consent; // Show banner if no consent found
  };

  const [isVisible, setIsVisible] = useState(getInitialVisibility);
  const [hasConsent, setHasConsent] = useState(getInitialConsent);

  const loadAnalyticsScript = () => {
    // Only load in production
    if (process.env.NODE_ENV !== 'production') return;

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
  };

  useEffect(() => {
    // Load analytics script when consent is given
    if (hasConsent) {
      loadAnalyticsScript();
    }
  }, [hasConsent]);

  const removeAnalyticsScript = () => {
    // Remove Plausible scripts
    const scripts = document.head.querySelectorAll('script[src*="pa-DNqZ1q8GPlR5n-3Gr2tm4"]');
    scripts.forEach(script => script.remove());
    
    // Remove initialization script
    const initScripts = document.head.querySelectorAll('script');
    initScripts.forEach(script => {
      if (script.textContent && script.textContent.includes('plausible.init')) {
        script.remove();
      }
    });
  };

  const handleAccept = () => {
    localStorage.setItem('analytics-consent', 'accepted');
    setHasConsent(true);
    setIsVisible(false);
    loadAnalyticsScript();
  };

  const handleReject = () => {
    localStorage.setItem('analytics-consent', 'rejected');
    setHasConsent(false);
    setIsVisible(false);
    removeAnalyticsScript();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Don't set consent - will ask again on next visit
  };

  if (!isVisible || hasConsent !== undefined) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Cookie Icon and Message */}
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Privacy & Analytics
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                I use privacy-focused analytics to understand how visitors interact with my portfolio. 
                No personal data is collected, and no cookies are used for tracking. 
                Your privacy is respected.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Shield className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600 font-medium">
                  GDPR Compliant • Privacy First
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="text-xs h-8 px-3"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="text-xs h-8 px-3 bg-primary hover:bg-primary/90"
            >
              Accept
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-xs h-8 w-8 p-0 sm:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span>🔒 No personal data collected</span>
            <span>📊 Anonymous usage statistics only</span>
            <span>🚫 No advertising cookies</span>
            <span className="text-primary hover:text-primary/80 cursor-pointer underline">
              <a 
                href="/privacy" 
                onClick={(e) => {
                  e.preventDefault();
                  // You can open a privacy modal here
                  alert('Privacy Policy: This site uses Plausible Analytics for privacy-focused analytics. No personal data is collected.');
                }}
              >
                Learn more
              </a>
            </span>
          </div>
        </div>

        {/* Close Button for Desktop */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="absolute top-4 right-4 h-6 w-6 p-0 hidden sm:flex"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Cookie Settings Component for managing preferences
export const CookieSettings = () => {
  // Initialize state from localStorage to avoid setState in effect
  const getInitialAnalytics = () => {
    if (typeof window === 'undefined') return false;
    const consent = localStorage.getItem('analytics-consent');
    return consent === 'accepted';
  };

  const [analytics, setAnalytics] = useState(getInitialAnalytics);

  useEffect(() => {
    // Load/remove analytics script when analytics state changes
    if (analytics) {
      localStorage.setItem('analytics-consent', 'accepted');
      // Load analytics script
      const script = document.createElement('script');
      script.src = 'https://plausible.io/js/plausible.js';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-domain', 'nkwenti-severian-ndongtsop.vercel.app');
      document.head.appendChild(script);
    } else {
      localStorage.setItem('analytics-consent', 'rejected');
      // Remove analytics script
      const scripts = document.head.querySelectorAll('script[data-domain="nkwenti-severian-ndongtsop.vercel.app"]');
      scripts.forEach(script => script.remove());
    }
  }, [analytics]);

  const handleToggleAnalytics = (enabled: boolean) => {
    setAnalytics(enabled);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Analytics Preferences</h3>
      
      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
        <div className="flex items-center gap-3">
          <Cookie className="h-4 w-4 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Privacy Analytics</p>
            <p className="text-xs text-muted-foreground">
              Anonymous usage statistics to improve this portfolio
            </p>
          </div>
        </div>
        <Button
          variant={analytics ? "default" : "outline"}
          size="sm"
          onClick={() => handleToggleAnalytics(!analytics)}
          className="text-xs"
        >
          {analytics ? 'Enabled' : 'Disabled'}
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• No personal data is collected</p>
        <p>• No cookies are used for tracking</p>
        <p>• Data is used solely to improve user experience</p>
        <p>• You can change these settings anytime</p>
      </div>
    </div>
  );
};

export default CookieBanner;
