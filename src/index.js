let loaded = false;
let key = null;
let injectedDoc = null;
let context = getGlobalContext();

/**
 * Set the KISSmetrics API key
 *
 * @param newquay
 */
export function setKey(newquay) {
  key = newquay;
}

/**
 * Set the document, only used for passing
 * in a mock for testing.
 *
 * @param newDocument
 */
export function setDocument(newDocument) {
  injectedDoc = newDocument;
}

/**
 * Get the document.  Allows us to inject a mock document
 * for testing outside a browser env.
 *
 * @returns {*|HTMLDocument}
 */
function getDocument() {
  return injectedDoc || document;
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
 * Load KISSmetrics scripts from their site.
 *
 * @param source
 */
function loadExternalScript(source) {
  setTimeout(function () {
    const documentObj = getDocument();
    const firstScript = documentObj.getElementsByTagName('script')[0];
    let element = documentObj.createElement('script');
    element.type = 'text/javascript';
    element.async = true;
    element.src = source;
    firstScript.parentNode.insertBefore(element, firstScript);
  }, 1);
}

/**
 * Initial load of KISSmetrics
 */
export function setup() {
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
  setup();
  context._kmq.push(['record', name, eventProps]);
}

/**
 * Set a user property in KISSmetrics
 *
 * @param userProps
 */
export function setUserProperties(userProps) {
  setup();
  context._kmq.push(['set', userProps]);
}

export default {
  trackEvent, setKey, setUserProperties, setup
};
