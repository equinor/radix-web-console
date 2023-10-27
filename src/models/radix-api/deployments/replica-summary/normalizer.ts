import { ReplicaSummaryModel, ReplicaSummaryNormalizedModel } from '.';

import { ReplicaStatus } from '../replica-status';
import { ResourceRequirementsModelNormalizer } from '../resource-requirements/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  dateNormalizer,
  objectNormalizer,
  omitFields,
} from '../../../model-utils';

/**
 * Create a ReplicaSummaryNormalizedModel object
 */
export const ReplicaSummaryModelNormalizer: ModelNormalizerType<
  Readonly<ReplicaSummaryNormalizedModel>,
  ReplicaSummaryModel | ReplicaSummaryNormalizedModel
> = (props: ReplicaSummaryModel & ReplicaSummaryNormalizedModel) =>
  Object.freeze(
    objectNormalizer<ReplicaSummaryNormalizedModel>(
      {
        ...omitFields(props, ['replicaStatus']), // omit replicaStatus key from source
        status: (props.replicaStatus?.status as ReplicaStatus) || props.status,
      },
      {
        created: dateNormalizer,
        containerStarted: dateNormalizer,
        resources: ResourceRequirementsModelNormalizer,
      }
    )
  );
