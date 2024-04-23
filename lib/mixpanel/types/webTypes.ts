
import { BaseMixpanelEvent, BaseEventContext, BaseEventData } from './baseTypes.ts';

export interface WebEventContext extends BaseEventContext {
    title?: string;
    pathname?: string;
    href?: string;
    route?: string;
    audience?: string;
    section?: string;
    pwa?: boolean;
}

export interface WebEventData extends BaseEventData {
    pathname: string;
    href?: string;
    route?: string;
    audience?: string;
}


/**
 * @description
 * Mixpanel event we will pass this event to our own backend that is used as a proxy for Mixpanel. Almost everything is optional. The only required field is `name`.
 * the other properties are suggestions for a "normal" event.
 * @example
 *  const event: MixpanelEvent = {
 *      name: 'Contact', // e.g. "Update profile", "Add to cart", "Purchase"
 *      context: { // Give some context to the event. Where is it triggered and by who
 *          title: 'Product Page', // What page is the event triggered on
 *          pathname: '/product/123', // Make sure there aren't any personal info in the path
 *          href: 'https://www.example.com/product/123', // Make sure there aren't any personal info in the href
 *          route: '/product/:id',
 *          audience: 'Freelancer', // Who is triggering this event e.g. a role or "new user"
 *          section: 'footer', // What section is the event triggered in
 *          pwa: true, // Is the event triggered in a PWA
 *          utm_source: 'Facebook', // track the source where traffic is coming from, including a website or advertiser
 *          utm_medium: 'advertising', // track the advertising medium, including email and banner ads
 *          utm_campaign: 'Black friday', // track the campaign name associated with the traffic
 *          utm_content: 'cta button', //track the specific link within in an ad that a user clicked
 *          utm_term: 'tv sale', // track keywords associated with campaigns
 *      },
 *      data: { // Any other properties that you want to add to the event
 *          product_id: '123',
 *      }
 * }
 */
export interface WebMixpanelEvent extends BaseMixpanelEvent {
    context?: WebEventContext;
    data?: WebEventData;
}

/**
 * @description
 * When sending a page view event to Mixpanel we will pass this event to our own backend that is used as a proxy for Mixpanel.
 * It differs from the `MixpanelEvent` in that it has a fixed `name` and information about the page should be provided
 *
 * @example
 * const event: MixpanelPageViewEvent = {
 *    data: {
 *      title: 'Product Page', // What page is the event triggered on
 *      pathname: '/product/123', // Make sure there aren't any personal info in the path
 *      href: 'https://www.example.com/product/123', // Make sure there aren't any personal info in the href
 *      route: '/product/:id',
 *      audience: 'Freelancer', // The audience that is viewing the page
 *   },
 *   context: { // This is optional and will be mostly provided by the MixpanelProvider
 *      pwa: true, // Is the event triggered in a PWA
 *      utm_source: 'Facebook', // track the source where traffic is coming from, including a website or advertiser
 *      utm_medium: 'advertising', // track the advertising medium, including email and banner ads
 *      utm_campaign: 'Black friday', // track the campaign name associated with the traffic
 *      utm_content: 'cta button', //track the specific link within in an ad that a user clicked
 *      utm_term: 'tv sale', // track keywords associated with campaigns
 *   }
 *}
 */
export interface WebMixpanelPageViewEvent {
    context?: WebEventContext;
    data: WebEventData;
}
