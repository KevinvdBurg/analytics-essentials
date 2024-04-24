import {
  BaseEventContext,
  BaseEventData,
  BaseMixpanelEvent,
  MixpanelBaseEventData,
  MixpanelEventContext,
} from './baseTypes.ts';

export interface MobileMixpanelEvent extends BaseMixpanelEvent {
  context?: {
    screenName?: string;
    route?: string;
  } & MixpanelEventContext;
  data?: BaseEventData;
}

export interface MobileMixpanelPageViewEvent {
  context?: BaseEventContext;
  data: {
    pathname?: string;
  } & MixpanelBaseEventData;
}
