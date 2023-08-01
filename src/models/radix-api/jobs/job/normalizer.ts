import { JobModel } from '.';

import { StepModelNormalizer } from '../step/normalizer';
import { ComponentSummaryModelNormalizer } from '../../deployments/component-summary/normalizer';
import { DeploymentSummaryModelNormalizer } from '../../deployments/deployment-summary/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  objectNormalizer,
} from '../../../model-utils';

/**
 * Create a JobModel object
 */
export const JobModelNormalizer: ModelNormalizerType<Readonly<JobModel>> = (
  props
) =>
  Object.freeze(
    objectNormalizer(props, {
      created: dateNormalizer,
      started: dateNormalizer,
      ended: dateNormalizer,
      steps: (x: []) => arrayNormalizer(x, StepModelNormalizer),
      deployments: (x: []) =>
        arrayNormalizer(x, DeploymentSummaryModelNormalizer),
      components: (x: []) =>
        arrayNormalizer(x, ComponentSummaryModelNormalizer),
    })
  );
