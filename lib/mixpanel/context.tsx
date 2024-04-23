'use client';

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { writeUtmParamsToSessionStorage } from './web/utils.ts';
import { TrackingService } from './tracking/TrackingService.ts';
import {
    WebMixpanelEvent,
    WebMixpanelPageViewEvent,
} from './types/webTypes.ts';
import {
    MobileMixpanelEvent,
    MobileMixpanelPageViewEvent,
} from './types/mobileTypes.ts';

interface MixpanelContextProps {
    trackEvent: (event: WebMixpanelEvent | MobileMixpanelEvent) => void;
    trackPageView: (
        event: WebMixpanelPageViewEvent | MobileMixpanelPageViewEvent
    ) => void;
    setEventContext: (
        context: WebMixpanelEvent['context'] | MobileMixpanelEvent['context']
    ) => void;
}

interface MixpanelProviderProps {
    children: React.ReactNode;
    trackingService: TrackingService;
    defaultEventContext?:
        | WebMixpanelEvent['context']
        | MobileMixpanelEvent['context'];
}

const MixpanelContext = createContext<MixpanelContextProps | null>(null);

export function useMixpanelContext() {
    const context = useContext(MixpanelContext);

    if (!context) {
        throw new Error('<MixpanelProvider /> not found');
    }

    return context;
}

export function MixpanelProvider({
    children,
    trackingService,
    defaultEventContext,
}: MixpanelProviderProps) {
    const [eventContext, setEventContext] = useState<
        WebMixpanelEvent['context'] | MobileMixpanelEvent['context']
    >(defaultEventContext || {});

    const trackEvent = useCallback(
        (event: WebMixpanelEvent | MobileMixpanelEvent) => {
            trackingService.trackEvent({
                ...event,
                context: {
                    ...eventContext,
                    ...event.context,
                },
            });
        },
        [trackingService, eventContext]
    );

    const trackPageView = useCallback(
        (event: WebMixpanelPageViewEvent | MobileMixpanelPageViewEvent) => {
            trackingService.trackPageView({
                ...event,
                context: {
                    ...eventContext,
                    ...event.context,
                },
            });
        },
        [trackingService, eventContext]
    );

    useEffect(() => {
        // Only run on Web / Client
        if (typeof window === 'undefined') {
            return;
        }

        writeUtmParamsToSessionStorage(window.location.search);
    }, []);

    return (
        <MixpanelContext.Provider
            value={{
                trackEvent,
                trackPageView,
                setEventContext,
            }}
        >
            {children}
        </MixpanelContext.Provider>
    );
}
