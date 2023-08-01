import { EventModel } from '.';

import { ObjectStateModelNormalizer } from '../object-state/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create an EventModel object
 */
export const EventModelNormalizer: ModelNormalizerType<Readonly<EventModel>> = (
  props
) =>
  Object.freeze(
    objectNormalizer(props, {
      lastTimestamp: dateNormalizer,
      involvedObjectState: ObjectStateModelNormalizer,
    })
  );
