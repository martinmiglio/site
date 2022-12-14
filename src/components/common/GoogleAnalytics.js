import ReactGA from 'react-ga4';
import {process} from 'process';

const GA_MEASUREMENT_ID = 'G-KNE7S7EQFD';

/**
 * Initialize google analytics with tracking ID and settings
 */
export function initializeGA() {
  const isDev = process.env.NODE_ENV === 'development';
  console.log('isDev: ', isDev);
  ReactGA.initialize(GA_MEASUREMENT_ID, {
    gaOptions: {debug_mode: isDev},
    gtagOptions: {debug_mode: isDev},
    debug: isDev,
  });
}

/**
 * updates reactga with a page change
 * @param {string} page The page to update ReactGA with.
 */
export function pageChange(page) {
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname + window.location.search,
  });
  const devQuery = '?utm_source=dev&utm_medium=dev';
  if (
    window.location.href.split('/').pop() !== devQuery &&
    // eslint-disable-next-line no-undef
    (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
  ) {
    window.location.href = page + devQuery;
  }
}

/**
 * socal bar click event handler
 * @param {string} socialType Name of contact event
 */
export function socialBarEvent(socialType) {
  ReactGA.event({
    category: 'User',
    action: `Clicked social: ${socialType}`,
  });
}

/**
 * source link click event handler
 */
export function sourceLinkEvent() {
  ReactGA.event({
    category: 'User',
    action: 'Clicked source link',
  });
}
