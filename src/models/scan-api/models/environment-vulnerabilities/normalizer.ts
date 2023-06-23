import { EnvironmentVulnerabilitiesModel } from '.';

import { ImageWithLastScanModelNormalizer } from '../image-with-last-scan/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields, recordNormalizer } from '../../../model-utils';

/**
 * Create an EnvironmentVulnerabilitiesModel object
 */
export const EnvironmentVulnerabilitiesModelNormalizer: ModelNormalizerType<
  EnvironmentVulnerabilitiesModel
> = (props) => {
  const normalized = { ...(props as EnvironmentVulnerabilitiesModel) };

  normalized.components = recordNormalizer(
    normalized.components,
    ImageWithLastScanModelNormalizer
  );
  normalized.jobs = recordNormalizer(
    normalized.jobs,
    ImageWithLastScanModelNormalizer
  );

  return Object.freeze(filterUndefinedFields(normalized));
};
