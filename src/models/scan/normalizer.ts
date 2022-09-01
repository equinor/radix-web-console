import { ScanModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';
import { VulnerabilitySummaryModelNormalizer } from '../vulnerability-summary/normalizer';

/**
 * Create a ScanModel object
 */
export const ScanModelNormalizer: ModelNormalizerType<ScanModel> = (props) => {
  const normalized = { ...(props as ScanModel) };

  normalized.vulnerabilities =
    normalized.vulnerabilities &&
    VulnerabilitySummaryModelNormalizer(normalized.vulnerabilities);

  return Object.freeze(filterUndefinedFields(normalized));
};
