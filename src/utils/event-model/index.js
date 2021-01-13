import { toLower } from 'lodash';

const isPodStateStarted = (event) => {
  return !!event?.involvedObjectState?.pod?.started;
};

const isPodStateReady = (event) => {
  return !!event?.involvedObjectState?.pod?.ready;
};

const isPodStateSet = (event) => {
  return !!event?.involvedObjectState?.pod;
};

const warningStateHandler = Object.freeze({
  pod: {
    failedscheduling: {
      resolved: (event) => isPodStateSet(event),
      obsolete: () => false,
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

const getWarningStateHandler = (event) => {
  const objectKindHandler =
    warningStateHandler[toLower(event?.involvedObjectKind)];

  if (!objectKindHandler) {
    return null;
  }

  return objectKindHandler[toLower(event?.reason)];
};

export const isWarningEvent = (event) => {
  return toLower(event?.type) === 'warning';
};

export const isEventObsolete = (event) => {
  if (!isWarningEvent(event)) {
    return false;
  }

  const handler = getWarningStateHandler(event);
  return handler?.obsolete ? handler.obsolete(event) : false;
};

export const isEventResolved = (event) => {
  if (!isWarningEvent(event)) {
    return false;
  }

  const handler = getWarningStateHandler(event);
  return handler?.resolved ? handler.resolved(event) : false;
};
