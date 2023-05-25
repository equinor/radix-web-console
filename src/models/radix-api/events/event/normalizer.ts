import { EventModel } from '.';

import { ObjectStateModelNormalizer } from '../object-state/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, filterUndefinedFields } from '../../../model-utils';

/**
 * Create an EventModel object
 */
export const EventModelNormalizer: ModelNormalizerType<EventModel> = (
  props
) => {
  const normalized = { ...(props as EventModel) };

  normalized.lastTimestamp = dateNormalizer(normalized.lastTimestamp);
  normalized.involvedObjectState =
    normalized.involvedObjectState &&
    ObjectStateModelNormalizer(normalized.involvedObjectState);

  return Object.freeze(filterUndefinedFields(normalized));
};
