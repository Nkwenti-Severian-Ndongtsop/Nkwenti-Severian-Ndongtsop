import { useCallback } from 'react';
import { useAnalytics } from '@/components/analytics/Analytics';

// Custom hook for easy analytics tracking
export const useAnalyticsTracking = () => {
  const analytics = useAnalytics();

  // Track navigation events
  const trackNavigation = useCallback((page: string, section?: string) => {
    analytics.trackEvent('Navigation', {
      page: page,
      section: section,
      category: 'Navigation'
    });
  }, [analytics]);

  // Track external link clicks
  const trackExternalLink = useCallback((url: string, platform?: string) => {
    analytics.trackEvent('ExternalLink', {
      url: url,
      platform: platform,
      category: 'External Links'
    });
  }, [analytics]);

  // Track file downloads
  const trackDownload = useCallback((fileName: string, fileType: string) => {
    analytics.trackDownload(fileName, fileType);
  }, [analytics]);

  // Track form interactions
  const trackFormInteraction = useCallback((formName: string, action: 'view' | 'start' | 'submit' | 'error', field?: string) => {
    analytics.trackEvent('FormInteraction', {
      form: formName,
      action: action,
      field: field,
      category: 'Forms'
    });
  }, [analytics]);

  // Track skill interactions
  const trackSkillInteraction = useCallback((skillName: string, action: 'view' | 'hover' | 'click', proficiency?: number) => {
    analytics.trackEvent('SkillInteraction', {
      skill: skillName,
      action: action,
      proficiency: proficiency,
      category: 'Skills'
    });
  }, [analytics]);

  // Track project interactions
  const trackProjectInteraction = useCallback((projectName: string, action: 'view' | 'click' | 'github' | 'live', projectUrl?: string) => {
    analytics.trackEvent('ProjectInteraction', {
      project: projectName,
      action: action,
      projectUrl: projectUrl,
      category: 'Projects'
    });
  }, [analytics]);

  // Track social media interactions
  const trackSocialInteraction = useCallback((platform: string, action: 'click' | 'share', url?: string) => {
    analytics.trackSocialClick(platform, url || '');
  }, [analytics]);

  // Track theme changes
  const trackThemeChange = useCallback((theme: 'light' | 'dark' | 'system') => {
    analytics.trackEvent('ThemeChange', {
      theme: theme,
      category: 'User Preferences'
    });
  }, [analytics]);

  // Track language changes
  const trackLanguageChange = useCallback((language: string) => {
    analytics.trackEvent('LanguageChange', {
      language: language,
      category: 'User Preferences'
    });
  }, [analytics]);

  // Track search queries
  const trackSearch = useCallback((query: string, resultsCount: number, searchType: 'site' | 'projects' | 'skills') => {
    analytics.trackSearch(query, resultsCount);
    analytics.trackEvent('SiteSearch', {
      query: query,
      resultsCount: resultsCount,
      searchType: searchType,
      category: 'Search'
    });
  }, [analytics]);

  // Track performance metrics
  const trackPerformance = useCallback((metric: string, value: number, unit: string) => {
    analytics.trackEvent('Performance', {
      metric: metric,
      value: value,
      unit: unit,
      category: 'Performance'
    });
  }, [analytics]);

  // Track accessibility features
  const trackAccessibility = useCallback((feature: string, action: 'enable' | 'disable') => {
    analytics.trackEvent('Accessibility', {
      feature: feature,
      action: action,
      category: 'Accessibility'
    });
  }, [analytics]);

  // Track errors and exceptions
  const trackError = useCallback((errorType: string, errorMessage: string, context: string, stack?: string) => {
    analytics.trackError(errorType, errorMessage, context);
    analytics.trackEvent('JavaScriptError', {
      errorType: errorType,
      errorMessage: errorMessage,
      context: context,
      stack: stack ? stack.substring(0, 500) : undefined, // Limit stack trace length
      category: 'Errors'
    });
  }, [analytics]);

  // Track feature usage
  const trackFeatureUsage = useCallback((featureName: string, action: string, properties?: Record<string, any>) => {
    analytics.trackEvent('FeatureUsage', {
      feature: featureName,
      action: action,
      ...properties,
      category: 'Features'
    });
  }, [analytics]);

  return {
    // Navigation
    trackNavigation,
    trackExternalLink,
    
    // Content Interactions
    trackDownload,
    trackFormInteraction,
    trackSkillInteraction,
    trackProjectInteraction,
    trackSocialInteraction,
    
    // User Preferences
    trackThemeChange,
    trackLanguageChange,
    trackSearch,
    
    // Technical
    trackPerformance,
    trackAccessibility,
    trackError,
    trackFeatureUsage,
    
    // Original analytics methods
    trackButtonClick: analytics.trackButtonClick,
    trackProjectView: analytics.trackProjectView,
    trackSkillView: analytics.trackSkillView,
    trackContactForm: analytics.trackContactForm,
    trackChatInteraction: analytics.trackChatInteraction
  };
};

export default useAnalyticsTracking;
