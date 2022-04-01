import { ComponentModel } from '.';
import { ModelNormalizerType } from '../model-types';

import { HorizontalScalingSummaryModelNormalizer } from '../horizontal-scaling-summary/normalizer';
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

  normalized.ports = normalized.ports?.map(PortModelNormalizer);
  normalized.replicaList = normalized.replicaList?.map(
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
