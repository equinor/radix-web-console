import { ImageScanModel } from '.';

import { VulnerabilityModelNormalizer } from '../vulnerability/normalizer';
import { VulnerabilitySummaryModelNormalizer } from '../vulnerability-summary/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  filterUndefinedFields,
} from '../../../model-utils';

/**
 * Create an ImageScanModel object
 */
export const ImageScanModelNormalizer: ModelNormalizerType<ImageScanModel> = (
  props
) => {
  const normalized = { ...(props as ImageScanModel) };

  normalized.scanTime = dateNormalizer(normalized.scanTime);
  normalized.vulnerabilitySummary =
    normalized.vulnerabilitySummary &&
    VulnerabilitySummaryModelNormalizer(normalized.vulnerabilitySummary);
  normalized.vulnerabilities = arrayNormalizer(
    normalized.vulnerabilities,
    VulnerabilityModelNormalizer
  );

  return Object.freeze(filterUndefinedFields(normalized));
};
