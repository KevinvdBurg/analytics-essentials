export interface BaseEventContext {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  [key: string]: unknown;
}

export interface BaseEventData {
  [key: string]: unknown;
}

export interface MixpanelEventContext extends BaseEventContext {
  title?: string;
  audience?: string;
  section?: string;
}

export interface MixpanelBaseEventData extends BaseEventData {
  audience?: string;
}

export interface BaseMixpanelEvent {
  name: string;
  context?: BaseEventContext;
  data?: BaseEventData;
}
