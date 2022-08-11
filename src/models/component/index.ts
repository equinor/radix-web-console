import * as PropTypes from 'prop-types';

import { ComponentStatus } from '../component-status';
import { ComponentType } from '../component-type';
import {
  HorizontalScalingSummaryModel,
  HorizontalScalingSummaryModelValidationMap,
} from '../horizontal-scaling-summary';
import {
  OAuthAuxiliaryResourceModel,
  OAuthAuxiliaryResourceModelValidationMap,
} from '../oauth-auxiliary-resource';
import { PortModel, PortModelValidationMap } from '../port';
import {
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryNormalizedModelValidationMap,
} from '../replica-summary';

export interface ComponentModel {
  name: string;
  type: ComponentType;
  status: ComponentStatus;
  image: string;
  ports?: Array<PortModel>;
  schedulerPort?: number;
  scheduledJobPayloadPath?: string;
  secrets?: Array<string>;
  variables?: Record<string, string>;
  replicaList?: Array<ReplicaSummaryNormalizedModel>;
  horizontalScalingSummary?: HorizontalScalingSummaryModel;
  oauth2?: OAuthAuxiliaryResourceModel;
}

/* PropTypes validation map for ComponentModel */
export const ComponentModelValidationMap: PropTypes.ValidationMap<ComponentModel> =
  {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(ComponentType)).isRequired,
    status: PropTypes.oneOf(Object.values(ComponentStatus)).isRequired,
    image: PropTypes.string.isRequired,
    ports: PropTypes.arrayOf(
      PropTypes.shape(
        PortModelValidationMap
      ) as PropTypes.Requireable<PortModel>
    ),
    schedulerPort: PropTypes.number,
    scheduledJobPayloadPath: PropTypes.string,
    secrets: PropTypes.arrayOf(PropTypes.string),
    variables: PropTypes.objectOf(PropTypes.string),
    replicaList: PropTypes.arrayOf(
      PropTypes.shape(
        ReplicaSummaryNormalizedModelValidationMap
      ) as PropTypes.Requireable<ReplicaSummaryNormalizedModel>
    ),
    horizontalScalingSummary: PropTypes.shape(
      HorizontalScalingSummaryModelValidationMap
    ) as PropTypes.Requireable<HorizontalScalingSummaryModel>,
    oauth2: PropTypes.shape(
      OAuthAuxiliaryResourceModelValidationMap
    ) as PropTypes.Requireable<OAuthAuxiliaryResourceModel>,
  };
