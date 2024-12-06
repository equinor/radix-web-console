import type { Event } from '../../store/radix-api';

type EventStateValidator = (event: Readonly<Event>) => boolean;
type EventStateValidators = {
  resolved?: EventStateValidator;
  obsolete?: EventStateValidator;
};

const isPodStateSet: EventStateValidator = (event) =>
  !!event.involvedObjectState?.pod;

const isPodStateReady: EventStateValidator = (event) =>
  !!event.involvedObjectState?.pod?.ready;

const isPodStateStarted: EventStateValidator = (event) =>
  !!event.involvedObjectState?.pod?.started;

const warningStateHandler: Readonly<
  Record<string, Record<string, EventStateValidators>>
> = Object.freeze({
  pod: {
    failedscheduling: {
      resolved: (event) => isPodStateSet(event),
    },
    backoff: {
      resolved: (event) => isPodStateStarted(event),
      obsolete: (event) => !isPodStateSet(event),
    },
    unhealthy: {
      resolved: (event) => isPodStateStarted(event) && isPodStateReady(event),
      obsolete: (event) => !isPodStateSet(event),
    },
    failed: {
      resolved: (event) => isPodStateStarted(event),
      obsolete: (event) => !isPodStateSet(event),
    },
  },
});

function getWarningStateHandler({
  involvedObjectKind,
  reason,
}: Readonly<Event>) {
  return warningStateHandler[involvedObjectKind?.toLowerCase() ?? 'unknown']?.[
    reason?.toLowerCase() ?? 'unknown'
  ];
}

export function isEventObsolete(event: Readonly<Event>): boolean {
  return !!(
    isWarningEvent(event) && getWarningStateHandler(event)?.obsolete?.(event)
  );
}

export function isEventResolved(event: Readonly<Event>): boolean {
  return !!(
    isWarningEvent(event) && getWarningStateHandler(event)?.resolved?.(event)
  );
}

export function isWarningEvent({ type }: Readonly<Event>): boolean {
  return type?.toLowerCase() === 'warning';
}
