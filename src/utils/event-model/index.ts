import { toLower } from 'lodash';

import { EventModel } from '../../models/event';

type EventStateValidator = (event: EventModel) => boolean;
type EventStateValidators = {
  resolved?: EventStateValidator;
  obsolete?: EventStateValidator;
};

const isPodStateStarted: EventStateValidator = (event) =>
  !!event?.involvedObjectState?.pod?.started;

const isPodStateReady: EventStateValidator = (event) =>
  !!event?.involvedObjectState?.pod?.ready;

const isPodStateSet: EventStateValidator = (event) =>
  !!event?.involvedObjectState?.pod;

const warningStateHandler: Readonly<{
  [key: string]: { [key: string]: EventStateValidators };
}> = Object.freeze({
  pod: {
    failedscheduling: {
      resolved: (event) => isPodStateSet(event),
    },
    backoff: {
      resolved: (event) => isPodStateStarted(event),
      obsolete: (event) => !event?.involvedObjectState?.pod,
    },
    unhealthy: {
      resolved: (event) => isPodStateStarted(event) && isPodStateReady(event),
      obsolete: (event) => !event?.involvedObjectState?.pod,
    },
    failed: {
      resolved: (event) => isPodStateStarted(event),
      obsolete: (event) => !event?.involvedObjectState?.pod,
    },
  },
});

function getWarningStateHandler(event: EventModel) {
  const objectKindHandler =
    warningStateHandler[toLower(event?.involvedObjectKind)];
  return objectKindHandler && objectKindHandler[toLower(event?.reason)];
}

export function isEventObsolete(event: EventModel) {
  if (!isWarningEvent(event)) {
    return false;
  }

  const handler = getWarningStateHandler(event);
  return !!(handler?.obsolete && handler.obsolete(event));
}

export function isEventResolved(event: EventModel) {
  if (!isWarningEvent(event)) {
    return false;
  }

  const handler = getWarningStateHandler(event);
  return !!(handler?.resolved && handler.resolved(event));
}

export function isWarningEvent(event: EventModel) {
  return event?.type === 'Warning';
}
