import type { Event } from '../../store/radix-api';
import { isEventObsolete, isEventResolved, isWarningEvent } from '.';

const templateObject: Readonly<Event> = Object.freeze({
  type: '',
  involvedObjectKind: '',
  lastTimestamp: '',
  involvedObjectNamespace: '',
  involvedObjectName: '',
  reason: '',
  message: '',
});

function generateEventModelObject(
  template: Readonly<Event>,
  donor: Partial<Readonly<Event>>
): Readonly<Event> {
  return Object.freeze({ ...template, ...donor });
}

describe('isWarningEvent', () => {
  it('returns true when event type is Warning', () => {
    const event = generateEventModelObject(templateObject, { type: 'Warning' });
    expect(isWarningEvent(event)).toEqual(true);
  });

  it('returns false when event type is Warning', () => {
    const event = generateEventModelObject(templateObject, { type: 'Normal' });
    expect(isWarningEvent(event)).toEqual(false);
  });
});

describe('isEventObsolete for event without objectState', () => {
  const templateEvent = generateEventModelObject(templateObject, {
    type: 'Warning',
    involvedObjectKind: 'Pod',
  });

  it('returns false for FailedScheduling event', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'FailedScheduling',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns true for Backoff event', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Backoff',
    });
    expect(isEventObsolete(event)).toEqual(true);
  });

  it('returns true for Unhealthy event', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Unhealthy',
    });
    expect(isEventObsolete(event)).toEqual(true);
  });

  it('returns true for Failed event', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Failed',
    });
    expect(isEventObsolete(event)).toEqual(true);
  });

  it('returns false for an event with unhandled reason', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'AnUnhandledReason',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Failed event when objectKind is not Pod', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Failed',
      involvedObjectKind: 'Not-A-Pod(tm)',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Failed event when type is not Warning', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Failed',
      type: 'Normal',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });
});

describe('isEventObsolete for event with objectState', () => {
  const templateEvent = generateEventModelObject(templateObject, {
    type: 'Warning',
    involvedObjectKind: 'Pod',
    involvedObjectState: { pod: {} },
  });

  it('returns false for FailedScheduling event', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'FailedScheduling',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Backoff event', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Backoff',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Unhealthy event', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Unhealthy',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Failed event', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Failed',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for event with unhandled reason', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'AnUnhandledReason',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Failed event when objectKind is not Pod', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Failed',
      involvedObjectKind: 'Not-A-Pod(tm)',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });

  it('returns false for Failed event when type is not Warning', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Failed',
      type: 'Normal',
    });
    expect(isEventObsolete(event)).toEqual(false);
  });
});

describe('isEventResolved for event without objectState', () => {
  const templateEvent = generateEventModelObject(templateObject, {
    type: 'Warning',
    involvedObjectKind: 'Pod',
  });

  it('returns false for FailedScheduling event', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'FailedScheduling',
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Backoff event', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Backoff',
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Unhealthy event', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Unhealthy',
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Failed event', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Failed',
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for event with unhandled reason', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'AnUnhandledReason',
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Failed event when objectKind is not Pod', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Failed',
      involvedObjectKind: 'Not-A-Pod(tm)',
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Failed event when type is not Warning', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Failed',
      type: 'Normal',
    });
    expect(isEventResolved(event)).toEqual(false);
  });
});

describe('isEventResolved for event with objectState', () => {
  const templateEvent = generateEventModelObject(templateObject, {
    type: 'Warning',
    involvedObjectKind: 'Pod',
    involvedObjectState: { pod: {} },
  });

  it('returns true for FailedScheduling event', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'FailedScheduling',
    });
    expect(isEventResolved(event)).toEqual(true);
  });

  it('returns false for Backoff event when pod is not started', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Backoff',
      involvedObjectState: { pod: { started: false } },
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns true for Backoff event when pod is started', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Backoff',
      involvedObjectState: { pod: { started: true } },
    });
    expect(isEventResolved(event)).toEqual(true);
  });

  it('returns false for Unhealthy event when pod is started but not ready', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Unhealthy',
      involvedObjectState: { pod: { started: true, ready: false } },
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns true for Unhealthy event when pod is started and ready', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Unhealthy',
      involvedObjectState: { pod: { started: true, ready: true } },
    });
    expect(isEventResolved(event)).toEqual(true);
  });

  it('returns false for Failed event when pod is not started', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Failed',
      involvedObjectState: { pod: { started: false } },
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns true for Failed event when pod is started', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Failed',
      involvedObjectState: { pod: { started: true } },
    });
    expect(isEventResolved(event)).toEqual(true);
  });

  it('returns false for an event with unhandled reason', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'AnUnhandledReason',
      involvedObjectState: { pod: { started: true, ready: true } },
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Failed event when objectKind is not Pod', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Failed',
      involvedObjectKind: 'Not-A-Pod(tm)',
      involvedObjectState: { pod: { started: true } },
    });
    expect(isEventResolved(event)).toEqual(false);
  });

  it('returns false for Failed event when type is not Warning', () => {
    const event = generateEventModelObject(templateEvent, {
      reason: 'Failed',
      type: 'Normal',
      involvedObjectState: { pod: { started: true } },
    });
    expect(isEventResolved(event)).toEqual(false);
  });
});
