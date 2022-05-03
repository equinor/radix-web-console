import { EventModel } from '.';
import { ModelNormalizerType } from '../model-types';

import { ObjectStateModelNormalizer } from '../object-state/normalizer';

/**
 * Create an EventModel object
 */
export const EventModelNormalizer: ModelNormalizerType<EventModel> = (
  props
) => {
  const normalized = { ...(props as EventModel) };

  const lastTimestamp = new Date(normalized.lastTimestamp);

  normalized.lastTimestamp = isNaN(lastTimestamp?.valueOf())
    ? undefined
    : lastTimestamp;
  normalized.involvedObjectState =
    normalized.involvedObjectState &&
    ObjectStateModelNormalizer(normalized.involvedObjectState);

  return Object.freeze(normalized);
};
