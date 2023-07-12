import { ImageScanModel } from '.';

import { VulnerabilitySummaryModelNormalizer } from '../vulnerability-summary/normalizer';
import { VulnerabilityModelNormalizer } from '../vulnerability/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  objectNormalizer,
} from '../../../model-utils';

/**
 * Create an ImageScanModel object
 */
export const ImageScanModelNormalizer: ModelNormalizerType<
  Readonly<ImageScanModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<ImageScanModel>(props, {
      scanTime: dateNormalizer,
      vulnerabilitySummary: VulnerabilitySummaryModelNormalizer,
      vulnerabilities: (x: []) =>
        arrayNormalizer(x, VulnerabilityModelNormalizer),
    })
  );
