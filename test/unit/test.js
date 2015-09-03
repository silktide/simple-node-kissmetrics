import KissMetrics, { setDocument } from '../../src/index';

let insertBeforeSpy, clock;

describe('Kissmetrics tests', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
    insertBeforeSpy = sinon.spy();
    let mockDocument = {
      'getElementsByTagName': sinon.stub().returns(
        [
          {
            parentNode: {
              insertBefore: insertBeforeSpy
            }
          }
        ]
      ),
      'createElement': sinon.stub().returns({})
    };
    setDocument(mockDocument);
  });

  afterEach(function () {
    clock.restore();
    global._kmq = [];
  });


  it('should call the setup method when tracking an event', () => {
    KissMetrics.setKey('an example key');
    KissMetrics.trackEvent('blah');
    clock.tick(2);
    expect(insertBeforeSpy.callCount).to.be.above(0);
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
