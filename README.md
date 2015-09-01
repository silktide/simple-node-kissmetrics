# Simple node KISSmetrics library

A simple wrapper for KISSmetrics client library written in ES6.

* Loads KISSmetrics tracking JavaScript library.
* Exposes a convenient interface for:
    - Setting your KISSmetrics API key
    - Setting user properties
    - Tracking events.

[![Build Status](https://travis-ci.org/silktide/simple-node-kissmetrics.svg?branch=master)](https://travis-ci.org/silktide/simple-node-kissmetrics)
[![Code Climate](https://codeclimate.com/repos/55df319a69568066780016d6/badges/d2a8873373061fa5face/gpa.svg)](https://codeclimate.com/repos/55df319a69568066780016d6/feed)
[![Test Coverage](https://codeclimate.com/repos/55df319a69568066780016d6/badges/d2a8873373061fa5face/coverage.svg)](https://codeclimate.com/repos/55df319a69568066780016d6/coverage)

## Usage example

First, install the library.

    npm install simple-node-kissmetrics --save
    
Using is as simple as importing the library and calling a couple of functions.

    import kissmetrics from 'simple-node-kissmetrics';
    
    function setupMyApp() {
        // Must be called first to set the key for the library.  This only needs to be called once to initialise the library.
        kissmetrics.setKey(YOUR_API_KEY);
    }
    
    function trackSomething() {        
        // Track an event.
        kissmetrics.trackEvent("An event", {"property": "value"});
    }
    
    function setUserProperty() {
        // Track some user properties.
        kissmetrics.setUserProperties({"email": "user@xyz.com"});
    }
    
You can also import specific functions if you prefer.

    import { setup as setupAnalytics, trackEvent } from 'simple-node-kissmetrics';
    
    function setupMyApp() {
        setupAnalytics();
    }
    
    function trackSomething() {
        trackEvent("An event", {"property": "value"});
    }