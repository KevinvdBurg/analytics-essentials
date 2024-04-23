export interface BaseEventContext {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    [key: string]: unknown;
}

export interface BaseEventData {
    title?: string;
    [key: string]: unknown;
}

export interface BaseMixpanelEvent {
    name: string;
    context?: BaseEventContext;
    data?: BaseEventData;
}
