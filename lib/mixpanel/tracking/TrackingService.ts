import { WebMixpanelEvent, WebMixpanelPageViewEvent } from '../types/webTypes.ts';
import { MobileMixpanelEvent, MobileMixpanelPageViewEvent } from '../types/mobileTypes.ts';

export interface TrackingService {
  trackEvent(event: WebMixpanelEvent | MobileMixpanelEvent): void;
  trackPageView(event: WebMixpanelPageViewEvent | MobileMixpanelPageViewEvent): void;
}
