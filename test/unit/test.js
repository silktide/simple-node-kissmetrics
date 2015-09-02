import KissMetrics, { setScriptLoadFunction } from '../../src/index';

let scriptLoadSpy, clock;

describe('A feature test', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
    scriptLoadSpy = sinon.spy();
    setScriptLoadFunction(scriptLoadSpy);
  });

  afterEach(function () {
    clock.restore();
    global._kmq = [];
  });


  it('should call the setup method when tracking an event', () => {
    KissMetrics.setKey('an example key');
    KissMetrics.trackEvent('blah');
    clock.tick(2);
    expect(scriptLoadSpy.callCount).to.be.above(0);
  });

  it('should add an item to the queue on the global scope when tracking an event', () => {
    KissMetrics.setKey('an example key');
    KissMetrics.trackEvent('blah');
    expect(global._kmq).to.deep.equal([['record', 'blah', undefined]]);
  });

  it('should add an item to the queue on the global scope when setting user properties', () => {
    KissMetrics.setKey('an example key');
    KissMetrics.setUserProperties({'blah': 'blah'});
    expect(global._kmq).to.deep.equal([['set', {'blah': 'blah'}]]);
  });

});
