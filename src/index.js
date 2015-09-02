let loaded = false;
let key = null;
let injectedScriptLoadFunction = null;
let context = getGlobalContext();
import scriptLoad from 'script-load';

/**
 * Set the KISSmetrics API key
 *
 * @param newquay
 */
export function setKey(newquay) {
  key = newquay;
}

/**
 * Set the script loading function, only
 * used for passing in a mock for testing.
 *
 * @param fn
 */
export function setScriptLoadFunction(fn) {
  injectedScriptLoadFunction = fn;
}

function loadExternalScript(url) {
  if (typeof injectedScriptLoadFunction === "function") {
    injectedScriptLoadFunction(url);
    return;
  }
  scriptLoad(url);
}

/**
 * KISSmetrics library requires a _kmq and _kmk variable
 * on the window.  This function allows us to test this
 * module outside of a browser environment.
 *
 * @returns {*}
 */
function getGlobalContext() {
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  return {};
}

/**
 * Initial load of KISSmetrics
 */
function loadKissMetrics() {
  if (loaded) {
    return;
  }

  if (!key) {
    console.error('No key set for KISSmetrics, use setKey method to define it.');
    return;
  }

  context._kmq = context._kmq || [];
  context._kmk = context._kmk || key;
  loadExternalScript('//i.kissmetrics.com/i.js');
  loadExternalScript('//scripts.kissmetrics.com/' + key + '.2.js');

  loaded = true;
}

/**
 * Track an event in KISSmetrics
 * @param name
 * @param eventProps
 */
export function trackEvent(name, eventProps) {
  loadKissMetrics();
  context._kmq.push(['record', name, eventProps]);
}

/**
 * Set a user property in KISSmetrics
 *
 * @param userProps
 */
export function setUserProperties(userProps) {
  loadKissMetrics();
  context._kmq.push(['set', userProps]);
}

export default {
  trackEvent, setKey, setUserProperties
};
