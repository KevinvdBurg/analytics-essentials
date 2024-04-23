import { BaseMixpanelEvent, BaseEventContext, BaseEventData } from './baseTypes.ts';

interface MobileEventContext extends BaseEventContext {
    screen?: string; // e.g., 'Home', 'Settings'
}

interface MobileEventData extends BaseEventData {
    screen: string;
    section?: string;
}

export interface MobileMixpanelEvent extends BaseMixpanelEvent {
    context?: MobileEventContext;
    data?: MobileEventData;
}

export interface MobileMixpanelPageViewEvent {
    context?: MobileEventContext;
    data: MobileEventData;
}
