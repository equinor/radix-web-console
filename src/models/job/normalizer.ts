import { JobModel } from '.';

import { ComponentSummaryModelNormalizer } from '../component-summary/normalizer';
import { DeploymentSummaryModelNormalizer } from '../deployment-summary/normalizer';
import { ModelNormalizerType } from '../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  filterUndefinedFields,
} from '../model-utils';
import { StepModelNormalizer } from '../step/normalizer';

/**
 * Create a JobModel object
 */
export const JobModelNormalizer: ModelNormalizerType<JobModel> = (props) => {
  const normalized = { ...(props as JobModel) };

  normalized.created = dateNormalizer(normalized.created);
  normalized.started = dateNormalizer(normalized.started);
  normalized.ended = dateNormalizer(normalized.ended);
  normalized.components = arrayNormalizer(
    normalized.components,
    ComponentSummaryModelNormalizer
  );
  normalized.deployments = arrayNormalizer(
    normalized.deployments,
    DeploymentSummaryModelNormalizer
  );
  normalized.steps = arrayNormalizer(normalized.steps, StepModelNormalizer);

  return Object.freeze(filterUndefinedFields(normalized));
};
