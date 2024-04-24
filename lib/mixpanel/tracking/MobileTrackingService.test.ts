import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MobileTrackingService } from './MobileTrackingService';
import { MobileMixpanelEvent, MobileMixpanelPageViewEvent } from '../types/mobileTypes';

describe('MobileTrackingService', () => {
  const mockEventApiClient = vi.fn(() => Promise.resolve());
  let service: MobileTrackingService;
  let mockEvent: MobileMixpanelEvent;
  let mockPageViewEvent: MobileMixpanelPageViewEvent;

  beforeEach(() => {
    service = new MobileTrackingService(mockEventApiClient);
    // Setup mock data
    mockEvent = {
      name: 'Test Event',
      context: { screenName: 'HomeScreen', route: '/home' },
      data: { info: 'test' },
    };

    mockPageViewEvent = {
      context: { utm_source: 'google' },
      data: { title: 'Home Page', route: '/home', audience: 'users' },
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully track an event', async () => {
    await service.trackEvent(mockEvent);
    expect(mockEventApiClient).toHaveBeenCalledWith({
      ...mockEvent,
      context: { ...mockEvent.context },
    });
  });

  it('should successfully track a page view', async () => {
    await service.trackPageView(mockPageViewEvent);
    expect(mockEventApiClient).toHaveBeenCalledWith({
      ...mockPageViewEvent,
      name: 'Page view',
      context: { ...mockPageViewEvent.context },
    });
  });
});
