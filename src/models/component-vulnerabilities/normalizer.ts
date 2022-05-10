import { ComponentVulnerabilitiesModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { DateNormalizer } from '../model-utils';
import { VulnerabilityModelNormalizer } from '../vulnerability/normalizer';

export const ComponentVulnerabilitiesModelNormalizer: ModelNormalizerType<
  ComponentVulnerabilitiesModel
> = (props) => {
  const normalized = { ...(props as ComponentVulnerabilitiesModel) };

  normalized.scanTime = DateNormalizer(normalized.scanTime);
  normalized.vulnerabilities = Array.isArray(normalized.vulnerabilities)
    ? normalized.vulnerabilities.map(VulnerabilityModelNormalizer)
    : undefined;

  return Object.freeze(normalized);
};
