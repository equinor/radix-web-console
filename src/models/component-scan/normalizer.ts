import { ComponentScanModel } from '.';

import { ModelNormalizerType } from '../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  filterUndefinedFields,
} from '../model-utils';
import { VulnerabilityModelNormalizer } from '../vulnerability/normalizer';

/**
 * Create a ComponentScanModel object
 */
export const ComponentScanModelNormalizer: ModelNormalizerType<
  ComponentScanModel
> = (props) => {
  const normalized = { ...(props as ComponentScanModel) };

  normalized.scanTime = dateNormalizer(normalized.scanTime);
  normalized.vulnerabilities = arrayNormalizer(
    normalized.vulnerabilities,
    VulnerabilityModelNormalizer
  );

  return Object.freeze(filterUndefinedFields(normalized));
};
