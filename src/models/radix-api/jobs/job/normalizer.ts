import { JobModel } from '.';

import { StepModelNormalizer } from '../step/normalizer';
import { ComponentSummaryModelNormalizer } from '../../deployments/component-summary/normalizer';
import { DeploymentSummaryModelNormalizer } from '../../deployments/deployment-summary/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  filterUndefinedFields,
} from '../../../model-utils';

/**
 * Create a JobModel object
 */
export const JobModelNormalizer: ModelNormalizerType<JobModel> = (props) => {
  const normalized = { ...(props as JobModel) };

  normalized.created = dateNormalizer(normalized.created);
  normalized.started = dateNormalizer(normalized.started);
  normalized.ended = dateNormalizer(normalized.ended);
  normalized.steps = arrayNormalizer(normalized.steps, StepModelNormalizer);
  normalized.deployments = arrayNormalizer(
    normalized.deployments,
    DeploymentSummaryModelNormalizer
  );
  normalized.components = arrayNormalizer(
    normalized.components,
    ComponentSummaryModelNormalizer
  );

  return Object.freeze(filterUndefinedFields(normalized));
};
