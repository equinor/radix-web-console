import { ComponentVulnerabilitiesModel } from '.';
import { ModelNormalizerType } from '../model-types';
import { VulnerabilityModelNormalizer } from '../vulnerability/normalizer';

export const ComponentVulnerabilitiesModelNormalizer: ModelNormalizerType<
  ComponentVulnerabilitiesModel
> = (props) => {
  const normalized = { ...(props as ComponentVulnerabilitiesModel) };

  normalized.vulnerabilities = Array.isArray(normalized.vulnerabilities)
    ? normalized.vulnerabilities.map(VulnerabilityModelNormalizer)
    : undefined;

  return Object.freeze(normalized);
};
