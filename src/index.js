let loaded = false;
let key = null;
let injectedDoc = null;
let window = getGlobalContext();

export function setKey(newquay) {
  key = newquay;
};

export function setDocument(newDocument) {
  injectedDoc = newDocument;
};

function getDocument() {
  return injectedDoc || document;
}

function getGlobalContext() {
  return window || global || {};
}

function loadExternalScript(source) {
  setTimeout(function () {
    let documentObj = getDocument();
    const firstScript = documentObj.getElementsByTagName('script')[0];
    let element = documentObj.createElement('script');
    element.type = 'text/javascript';
    element.async = true;
    element.src = source;
    firstScript.parentNode.insertBefore(element, firstScript);
  }, 1);
};

function loadKissMetrics() {
  if (loaded) {
    return;
  }

  if (!key) {
    console.error("No key set for KISSmetrics, use setKey method to define it.");
  }

  window._kmq = window._kmq || [];
  window._kmk = window._kmk || key;
  loadExternalScript('//i.kissmetrics.com/i.js');
  loadExternalScript('//scripts.kissmetrics.com/' + key + '.2.js');

  loaded = true;
}


export function trackEvent(name, eventProps) {
  loadKissMetrics();
  window._kmq.push(['record', name, eventProps]);
};

export function setUserProperties(userProps) {
  loadKissMetrics();
  window._kmq.push(['set', userProps]);
}

export default {
  trackEvent, setKey, setDocument
}
