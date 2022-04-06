import * as PropTypes from 'prop-types';

import { ComponentStatus } from '../component-status';
import {
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryNormalizedModelValidationMap,
} from '../replica-summary';

export interface AuxiliaryResourceDeploymentModel {
  status: ComponentStatus;
  replicaList?: Array<ReplicaSummaryNormalizedModel>;
}

/* PropTypes validation map for AuxiliaryResourceDeploymentModel */
export const AuxiliaryResourceDeploymentModelValidationMap: PropTypes.ValidationMap<AuxiliaryResourceDeploymentModel> =
  {
    status: PropTypes.oneOf(Object.values(ComponentStatus)).isRequired,
    replicaList: PropTypes.arrayOf(
      PropTypes.shape(
        ReplicaSummaryNormalizedModelValidationMap
      ) as PropTypes.Requireable<ReplicaSummaryNormalizedModel>
    ),
  };
