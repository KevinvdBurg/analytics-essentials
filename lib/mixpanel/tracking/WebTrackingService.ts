import { TrackingService } from './TrackingService.ts';
import { extractUtmParams, isStandalonePWA } from '../web/utils.ts';
import { WebMixpanelEvent, WebMixpanelPageViewEvent } from '../types/webTypes.ts';

interface EventApiClient {
  (args: WebMixpanelEvent | WebMixpanelPageViewEvent): Promise<unknown>;
}

export class WebTrackingService implements TrackingService {
  private eventApiClient: EventApiClient;

  constructor(eventApiClient: EventApiClient) {
    this.eventApiClient = eventApiClient;
  }

  trackEvent(event: WebMixpanelEvent): void {
    if (typeof window === 'undefined') {
      return;
    }

    const utmParams = extractUtmParams(window.location.search);

    this.eventApiClient({
      ...event,
      context: {
        title: document.title,
        pathname: window.location.pathname,
        pwa: isStandalonePWA(),
        ...utmParams,
        ...event.context,
      },
    }).catch((e) => console.error('Failed to track event:', e));
  }

  trackPageView(event: WebMixpanelPageViewEvent): void {
    if (typeof window === 'undefined') {
      return;
    }

    const utmParams = extractUtmParams(window.location.search);

    this.eventApiClient({
      ...event,
      name: 'Page view',
      context: {
        pwa: isStandalonePWA(),
        ...utmParams,
        ...event.context,
      },
    }).catch((e) => console.error('Failed to track page view:', e));
  }
}
