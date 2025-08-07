import { useEffect } from 'react';
import { trpc } from '../utils/trpc';

interface AnalyticsEvent {
  eventType: 'button_click' | 'form_start' | 'form_step' | 'form_complete' | 'form_abandon' | 'page_interaction' | 'download' | 'external_link';
  eventCategory: 'navigation' | 'tax_declaration' | 'authentication' | 'payment' | 'general';
  eventData?: Record<string, any>;
}

// Generate a simple session ID for tracking user journeys
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('analytics_session', sessionId);
  }
  return sessionId;
};

export const useAnalytics = () => {
  const logVisitMutation = trpc.analytics.logVisit.useMutation();
  const logEventMutation = trpc.analytics.logEvent.useMutation();

  // Auto-track page visits
  useEffect(() => {
    const sessionId = getSessionId();
    
    console.log('Tracking page visit:', window.location.pathname);
    
    logVisitMutation.mutate({
      pagePath: window.location.pathname,
      referrer: document.referrer || undefined,
      sessionId,
    }, {
      onSuccess: (data) => {
        console.log('Visit logged successfully:', data);
      },
      onError: (error) => {
        console.error('Failed to log visit:', error);
      }
    });
  }, []); // Remove logVisitMutation dependency to prevent infinite loop

  const trackEvent = (event: AnalyticsEvent) => {
    const sessionId = getSessionId();
    
    console.log('Tracking event:', event);
    
    logEventMutation.mutate({
      ...event,
      pagePath: window.location.pathname,
      sessionId,
    }, {
      onSuccess: (data) => {
        console.log('Event logged successfully:', data);
      },
      onError: (error) => {
        console.error('Failed to log event:', error);
      }
    });
  };

  // Convenient methods for common events
  const trackButtonClick = (buttonId: string, additionalData?: Record<string, any>) => {
    trackEvent({
      eventType: 'button_click',
      eventCategory: 'navigation',
      eventData: { buttonId, ...additionalData },
    });
  };

  const trackTaxFormStart = () => {
    trackEvent({
      eventType: 'form_start',
      eventCategory: 'tax_declaration',
      eventData: { formType: 'tax_declaration' },
    });
  };

  const trackTaxFormStep = (step: number, stepName?: string) => {
    trackEvent({
      eventType: 'form_step',
      eventCategory: 'tax_declaration',
      eventData: { step, stepName },
    });
  };

  const trackTaxFormComplete = () => {
    trackEvent({
      eventType: 'form_complete',
      eventCategory: 'tax_declaration',
      eventData: { formType: 'tax_declaration' },
    });
  };

  const trackFormAbandon = (step?: number, stepName?: string) => {
    trackEvent({
      eventType: 'form_abandon',
      eventCategory: 'tax_declaration',
      eventData: { step, stepName },
    });
  };

  return {
    trackEvent,
    trackButtonClick,
    trackTaxFormStart,
    trackTaxFormStep,
    trackTaxFormComplete,
    trackFormAbandon,
  };
};