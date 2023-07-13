import { ScheduledJobSummaryModel } from '.';

import { NodeModelNormalizer } from '../node/normalizer';
import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';
import { ResourceRequirementsModelNormalizer } from '../resource-requirements/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  objectNormalizer,
} from '../../../model-utils';

/**
 * Create a ScheduledJobSummaryModel object
 */
export const ScheduledJobSummaryModelNormalizer: ModelNormalizerType<
  Readonly<ScheduledJobSummaryModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<ScheduledJobSummaryModel>(props, {
      created: dateNormalizer,
      started: dateNormalizer,
      ended: dateNormalizer,
      replicaList: (x: []) => arrayNormalizer(x, ReplicaSummaryModelNormalizer),
      resources: ResourceRequirementsModelNormalizer,
      node: NodeModelNormalizer,
      restart: dateNormalizer,
    })
  );
