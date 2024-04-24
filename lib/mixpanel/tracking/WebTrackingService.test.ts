// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck test file contains web apis that are not available in node environment for typescript

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WebTrackingService } from './WebTrackingService';
import { WebMixpanelEvent } from '../types/webTypes';
import { extractUtmParams, isStandalonePWA } from '../web/utils';

vi.mock('../web/utils', () => ({
  extractUtmParams: vi.fn(),
  isStandalonePWA: vi.fn(),
}));

describe('WebTrackingService', () => {
  const mockEventApiClient = vi.fn(() => Promise.resolve());
  let service: WebTrackingService;

  // Setup to simulate browser environment
  global.window = Object.create(window);
  const url = 'http://example.com?utm_source=test_source';
  Object.defineProperty(window, 'location', {
    value: {
      search: url.split('?')[1],
      pathname: '/test',
    },
  });

  global.document = {
    title: 'Test Page',
  };

  beforeEach(() => {
    service = new WebTrackingService(mockEventApiClient);
    (extractUtmParams as vi.Mock).mockReturnValue({
      utm_source: 'test_source',
    });
    (isStandalonePWA as vi.Mock).mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should track an event successfully', async () => {
    const event: WebMixpanelEvent = {
      name: 'Test Event',
      context: { additional: 'data' },
    };

    await service.trackEvent(event);
    expect(mockEventApiClient).toHaveBeenCalledWith({
      ...event,
      context: {
        title: 'Test Page',
        pathname: '/test',
        pwa: true,
        utm_source: 'test_source',
        additional: 'data',
      },
    });
  });

  it('should not track an event if window is undefined', async () => {
    delete global.window;
    const event: WebMixpanelEvent = { name: 'Test Event' };
    await service.trackEvent(event);
    expect(mockEventApiClient).not.toHaveBeenCalled();
  });
});
