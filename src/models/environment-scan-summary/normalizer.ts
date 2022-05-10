import { EnvironmentScanObjectModel, EnvironmentScanSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { DateNormalizer, KeyValuePairNormalizer } from '../model-utils';
import { VulnerabilitySummaryModelNormalizer } from '../vulnerability-summary/normalizer';

/**
 * Create an EnvironmentScanObjectModel object
 */
export const EnvironmentScanObjectModelNormalizer: ModelNormalizerType<
  EnvironmentScanObjectModel
> = (props) => {
  const normalized = { ...(props as EnvironmentScanObjectModel) };

  normalized.scanTime = DateNormalizer(normalized.scanTime);
  normalized.vulnerabilitySummary =
    normalized.vulnerabilitySummary &&
    VulnerabilitySummaryModelNormalizer(normalized.vulnerabilitySummary);

  return Object.freeze(normalized);
};

/**
 * Create an EnvironmentScanSummaryModel object
 */
export const EnvironmentScanSummaryModelNormalizer: ModelNormalizerType<
  EnvironmentScanSummaryModel
> = (props) => {
  const normalized = { ...(props as EnvironmentScanSummaryModel) };

  normalized.components =
    normalized.components &&
    KeyValuePairNormalizer(
      normalized.components,
      EnvironmentScanObjectModelNormalizer
    );
  normalized.jobs =
    normalized.jobs &&
    KeyValuePairNormalizer(
      normalized.jobs,
      EnvironmentScanObjectModelNormalizer
    );

  return Object.freeze(normalized);
};
