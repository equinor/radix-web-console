import { ComponentScanModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { DateNormalizer } from '../model-utils';
import { VulnerabilityModelNormalizer } from '../vulnerability/normalizer';

/**
 * Create a ComponentScanModel object
 */
export const ComponentScanModelNormalizer: ModelNormalizerType<
  ComponentScanModel
> = (props) => {
  const normalized = { ...(props as ComponentScanModel) };

  normalized.scanTime = DateNormalizer(normalized.scanTime);
  normalized.vulnerabilities = Array.isArray(normalized.vulnerabilities)
    ? normalized.vulnerabilities.map(VulnerabilityModelNormalizer)
    : undefined;

  return Object.freeze(normalized);
};
