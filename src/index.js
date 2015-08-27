let loaded = false;
let key = null;
let injectedDoc = null;
let context = getGlobalContext();

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
    const documentObj = getDocument();
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

  context._kmq = context._kmq || [];
  context._kmk = context._kmk || key;
  loadExternalScript('//i.kissmetrics.com/i.js');
  loadExternalScript('//scripts.kissmetrics.com/' + key + '.2.js');

  loaded = true;
}


export function trackEvent(name, eventProps) {
  loadKissMetrics();
  context._kmq.push(['record', name, eventProps]);
};

export function setUserProperties(userProps) {
  loadKissMetrics();
  context._kmq.push(['set', userProps]);
}

export default {
  trackEvent, setKey, setDocument
}
