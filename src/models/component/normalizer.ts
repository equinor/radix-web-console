import { ComponentModel } from '.';

import { HorizontalScalingSummaryModelNormalizer } from '../horizontal-scaling-summary/normalizer';
import { ModelNormalizerType } from '../model-types';
import { arrayNormalizer } from '../model-utils';
import { OAuthAuxiliaryResourceModelNormalizer } from '../oauth-auxiliary-resource/normalizer';
import { PortModelNormalizer } from '../port/normalizer';
import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';

/**
 * Create a ComponentModel object
 */
export const ComponentModelNormalizer: ModelNormalizerType<ComponentModel> = (
  props
) => {
  const normalized = { ...(props as ComponentModel) };

  normalized.ports = arrayNormalizer(normalized.ports, PortModelNormalizer);
  normalized.replicaList = arrayNormalizer(
    normalized.replicaList,
    ReplicaSummaryModelNormalizer
  );
  normalized.horizontalScalingSummary =
    normalized.horizontalScalingSummary &&
    HorizontalScalingSummaryModelNormalizer(
      normalized.horizontalScalingSummary
    );
  normalized.oauth2 =
    normalized.oauth2 &&
    OAuthAuxiliaryResourceModelNormalizer(normalized.oauth2);

  return Object.freeze(normalized);
};
