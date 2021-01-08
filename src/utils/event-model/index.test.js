import { isWarningEvent, isEventObsolete, isEventResolved } from '.';

describe('isWarningEvent', () => {
  it('returns true when event type is Warning', () => {
    const event = { type: 'Warning' };
    expect(isWarningEvent(event)).toEqual(true);
  });

  it('returns false when event type is Warning', () => {
    const event = { type: 'Normal' };
    expect(isWarningEvent(event)).toEqual(false);
  });
});

describe('isEventObsolete for event without objectState', () => {
  const templateEvent = {
    type: 'Warning',
    involvedObjectKind: 'Pod',
    reason: '',
  };

  it('returns false for FailedScheduling event', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'FailedScheduling',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns true for Backoff event', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Backoff',
    });
    expect(isEventObsolete(event)).toEqual(true);
  });

  it('returns true for Unhealthy event', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Unhealthy',
    });
    expect(isEventObsolete(event)).toEqual(true);
  });

  it('returns true for Failed event', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Failed',
    });
    expect(isEventObsolete(event)).toEqual(true);
  });

  it('returns false for an event with unhandled reason', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'AnUnhandledReason',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Failed event when objectKind is not Pod', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Failed',
      involvedObjectKind: 'NotPod',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Failed event when type is not Warning', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Failed',
      type: 'NotWarning',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });
});

describe('isEventObsolete for event with objectState', () => {
  const templateEvent = {
    type: 'Warning',
    involvedObjectKind: 'Pod',
    reason: '',
    involvedObjectState: {
      pod: {},
    },
  };

  it('returns false for FailedScheduling event', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'FailedScheduling',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Backoff event', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Backoff',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Unhealthy event', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Unhealthy',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Failed event', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Failed',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for event with unhandled reason', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'AnUnhandledReason',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Failed event when objectKind is not Pod', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Failed',
      involvedObjectKind: 'NotPod',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Failed event when type is not Warning', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Failed',
      type: 'NotWarning',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });
});

describe('isEventResolved for event without objectState', () => {
  const templateEvent = {
    type: 'Warning',
    involvedObjectKind: 'Pod',
    reason: '',
  };

  it('returns false for FailedScheduling event', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'FailedScheduling',
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Backoff event', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Backoff',
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Unhealthy event', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Unhealthy',
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Failed event', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Failed',
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for event with unhandled reason', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'AnUnhandledReason',
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Failed event when objectKind is not Pod', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Failed',
      involvedObjectKind: 'NotPod',
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Failed event when type is not Warning', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Failed',
      type: 'NotWarning',
    });
    expect(isEventResolved(event)).toEqual(false);
  });
});

describe('isEventResolved for event with objectState', () => {
  const templateEvent = {
    type: 'Warning',
    involvedObjectKind: 'Pod',
    reason: '',
    involvedObjectState: {
      pod: {},
    },
  };

  it('returns true for FailedScheduling event', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'FailedScheduling',
    });
    expect(isEventResolved(event)).toEqual(true);
  });

  it('returns false for Backoff event when pod is not started', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Backoff',
      involvedObjectState: {
        pod: { started: false },
      },
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns true for Backoff event when pod is started', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Backoff',
      involvedObjectState: {
        pod: { started: true },
      },
    });
    expect(isEventResolved(event)).toEqual(true);
  });

  it('returns false for Unhealthy event when pod is started but not ready', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Unhealthy',
      involvedObjectState: {
        pod: { started: true, ready: false },
      },
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns true for Unhealthy event when pod is started and ready', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Unhealthy',
      involvedObjectState: {
        pod: { started: true, ready: true },
      },
    });
    expect(isEventResolved(event)).toEqual(true);
  });

  it('returns false for Failed event when pod is not started', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Failed',
      involvedObjectState: {
        pod: { started: false },
      },
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns true for Failed event when pod is started', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Failed',
      involvedObjectState: {
        pod: { started: true },
      },
    });
    expect(isEventResolved(event)).toEqual(true);
  });

  it('returns false for an event with unhandled reason', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'AnUnhandledReason',
      involvedObjectState: {
        pod: { started: true, ready: true },
      },
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Failed event when objectKind is not Pod', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Failed',
      involvedObjectKind: 'NotPod',
      involvedObjectState: {
        pod: { started: true },
      },
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Failed event when type is not Warning', () => {
    const event = Object.assign({}, templateEvent, {
      reason: 'Failed',
      type: 'NotWarning',
      involvedObjectState: {
        pod: { started: true },
      },
    });
    expect(isEventResolved(event)).toEqual(false);
  });
});
