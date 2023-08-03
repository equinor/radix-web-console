import { EnvironmentVulnerabilitiesModel } from '.';

import { ImageWithLastScanModelNormalizer } from '../image-with-last-scan/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer, recordNormalizer } from '../../../model-utils';

/**
 * Create an EnvironmentVulnerabilitiesModel object
 */
export const EnvironmentVulnerabilitiesModelNormalizer: ModelNormalizerType<
  Readonly<EnvironmentVulnerabilitiesModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      components: (x: {}) =>
        recordNormalizer(x, ImageWithLastScanModelNormalizer),
      jobs: (x: {}) => recordNormalizer(x, ImageWithLastScanModelNormalizer),
    })
  );
