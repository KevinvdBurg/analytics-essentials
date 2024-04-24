import { afterEach, describe, expect, test } from 'vitest';
import { extractUtmParams, writeUtmParamsToSessionStorage } from './utils.ts';

describe('UTM tags', () => {
  const urlContainingUTMParams = new URL(
    'https://example.com?utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_content=content&utm_term=term'
  );

  test('extracting utm tags from url', () => {
    const result = extractUtmParams(urlContainingUTMParams.search);

    expect(result).toEqual({
      utm_source: 'source',
      utm_medium: 'medium',
      utm_campaign: 'campaign',
      utm_content: 'content',
      utm_term: 'term',
    });
  });

  test('utm tags are saved in session storage', () => {
    writeUtmParamsToSessionStorage(urlContainingUTMParams.search);

    expect(sessionStorage.getItem('utm_source')).toBe('source');
    expect(sessionStorage.getItem('utm_medium')).toBe('medium');
    expect(sessionStorage.getItem('utm_campaign')).toBe('campaign');
    expect(sessionStorage.getItem('utm_content')).toBe('content');
    expect(sessionStorage.getItem('utm_term')).toBe('term');
  });

  afterEach(() => {
    sessionStorage.clear();
  });
});
