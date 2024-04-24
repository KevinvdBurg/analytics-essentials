import { TrackingService } from './TrackingService.ts';
import { MobileMixpanelEvent, MobileMixpanelPageViewEvent } from '../types/mobileTypes.ts';

interface EventApiClient {
  (args: MobileMixpanelEvent | MobileMixpanelPageViewEvent): Promise<unknown>;
}

export class MobileTrackingService implements TrackingService {
  private eventApiClient: EventApiClient;

  constructor(eventApiClient: EventApiClient) {
    this.eventApiClient = eventApiClient;
  }

  trackEvent(event: MobileMixpanelEvent): void {
    this.eventApiClient({
      ...event,
      context: {
        ...event.context,
      },
    }).catch((e) => console.error('Failed to track event:', e));
  }

  trackPageView(event: MobileMixpanelPageViewEvent): void {
    this.eventApiClient({
      ...event,
      name: 'Page view',
      context: {
        ...event.context,
      },
    }).catch((e) => console.error('Failed to track page view:', e));
  }
}
