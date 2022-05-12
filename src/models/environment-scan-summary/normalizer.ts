import { ComponentScanModel, EnvironmentScanSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { dateNormalizer, keyValuePairNormalizer } from '../model-utils';
import { VulnerabilitySummaryModelNormalizer } from '../vulnerability-summary/normalizer';

/**
 * Create a ComponentScanModel object
 */
export const ComponentScanModelNormalizer: ModelNormalizerType<
  ComponentScanModel
> = (props) => {
  const normalized = { ...(props as ComponentScanModel) };

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
    keyValuePairNormalizer(normalized.components, ComponentScanModelNormalizer);
  normalized.jobs =
    normalized.jobs &&
    keyValuePairNormalizer(normalized.jobs, ComponentScanModelNormalizer);

  return Object.freeze(normalized);
};
