import {
  BaseEventContext,
  BaseEventData,
  BaseMixpanelEvent,
  MixpanelBaseEventData,
  MixpanelEventContext,
} from './baseTypes.ts';

/**
 * @description
 * Mixpanel event we will pass this event to our own backend that is used as a proxy for Mixpanel. Almost everything is optional. The only required field is `name`.
 * the other properties are suggestions for a "normal" event.
 * @example
 * const event: MobileMixpanelEvent = {
 *   name: 'Contact', // e.g. "Update profile", "Add to cart", "Purchase"
 *   context: { // Give some context to the event. Where is it triggered and by who
 *     pathname: '/product/123', // Make sure there aren't any personal info in the path
 *     audience: 'Freelancer', // Who is triggering this event e.g. a role or "new user"
 *     utm_source: 'Facebook', // track the source where traffic is coming from, including a website or advertiser
 *     utm_medium: 'advertising', // track the advertising medium, including email and banner ads
 *     utm_campaign: 'Black friday', // track the campaign name associated with the traffic
 *     utm_content: 'cta button', //track the specific link within in an ad that a user clicked
 *     utm_term: 'tv sale', // track keywords associated with campaigns
 *   },
 *   data: { // Any other properties that you want to add to the event
 *     product_id: '123',
 *   }
 * }
 */

export interface MobileMixpanelEvent extends BaseMixpanelEvent {
  context?: {
    pathname?: string;
  } & MixpanelEventContext;
  data?: BaseEventData;
}

/**
 * @description
 * When sending a page view event to Mixpanel we will pass this event to our own backend that is used as a proxy for Mixpanel.
 * It differs from the `MixpanelEvent` in that it has a fixed `name` and information about the page should be provided
 *
 *
 * For localSearchParams and globalSearchParams, we can use useLocalSearchParams and useGlobalSearchParams from expo-router
 * See: https://docs.expo.dev/router/reference/search-parameters/
 *
 * @example
 * const event: MobileMixpanelPageViewEvent = {
 *   context: {
 *     utm_source: 'Facebook', // track the source where traffic is coming from, including a website or advertiser
 *     utm_medium: 'advertising', // track the advertising medium, including email and banner ads
 *     utm_campaign: 'Black friday', // track the campaign name associated with the traffic
 *     utm_content: 'cta button', //track the specific link within in an ad that a user clicked
 *     utm_term: 'tv sale', // track keywords associated with campaigns
 *   },
 *   data: {
 *     pathname: '/product/detail', // The path of the page where the event is triggered
 *     audience: 'Freelancer', // The audience that is viewing the page
 *   },
 * };
 */
export interface MobileMixpanelPageViewEvent {
  context?: BaseEventContext;
  data: {
    pathname?: string;
  } & MixpanelBaseEventData;
}
