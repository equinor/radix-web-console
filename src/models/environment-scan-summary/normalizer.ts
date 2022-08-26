import { EnvironmentComponentScanModel, EnvironmentScanSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import {
  dateNormalizer,
  filterUndefinedFields,
  recordNormalizer,
} from '../model-utils';
import { VulnerabilitySummaryModelNormalizer } from '../vulnerability-summary/normalizer';

/**
 * Create an EnvironmentComponentScanModel object
 */
export const EnvironmentComponentScanModelNormalizer: ModelNormalizerType<
  EnvironmentComponentScanModel
> = (props) => {
  const normalized = { ...(props as EnvironmentComponentScanModel) };

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
    recordNormalizer(
      normalized.components,
      EnvironmentComponentScanModelNormalizer
    );
  normalized.jobs =
    normalized.jobs &&
    recordNormalizer(normalized.jobs, EnvironmentComponentScanModelNormalizer);

  return Object.freeze(filterUndefinedFields(normalized));
};
