import { EnvironmentScanObjectModel, EnvironmentScanSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { dateNormalizer, keyValuePairNormalizer } from '../model-utils';
import { VulnerabilitySummaryModelNormalizer } from '../vulnerability-summary/normalizer';

/**
 * Create an EnvironmentScanObjectModel object
 */
export const EnvironmentScanObjectModelNormalizer: ModelNormalizerType<
  EnvironmentScanObjectModel
> = (props) => {
  const normalized = { ...(props as EnvironmentScanObjectModel) };

  normalized.scanTime = dateNormalizer(normalized.scanTime);
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
    keyValuePairNormalizer(
      normalized.components,
      EnvironmentScanObjectModelNormalizer
    );
  normalized.jobs =
    normalized.jobs &&
    keyValuePairNormalizer(
      normalized.jobs,
      EnvironmentScanObjectModelNormalizer
    );

  return Object.freeze(normalized);
};
