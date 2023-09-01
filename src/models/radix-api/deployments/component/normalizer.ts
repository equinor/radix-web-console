import { ComponentModel } from '.';

import { HorizontalScalingSummaryModelNormalizer } from '../horizontal-scaling-summary/normalizer';
import { IdentityModelNormalizer } from '../identity/normalizer';
import { NotificationsModelNormalizer } from '../notifications/normalizer';
import { OAuthAuxiliaryResourceModelNormalizer } from '../oauth-auxiliary-resource/normalizer';
import { PortModelNormalizer } from '../port/normalizer';
import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { arrayNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create a ComponentModel object
 */
export const ComponentModelNormalizer: ModelNormalizerType<
  Readonly<ComponentModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      ports: (x) => arrayNormalizer(x, PortModelNormalizer),
      replicaList: (x) => arrayNormalizer(x, ReplicaSummaryModelNormalizer),
      horizontalScalingSummary: HorizontalScalingSummaryModelNormalizer,
      notifications: NotificationsModelNormalizer,
      identity: IdentityModelNormalizer,
      oauth2: OAuthAuxiliaryResourceModelNormalizer,
    })
  );
