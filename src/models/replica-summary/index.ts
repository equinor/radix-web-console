import * as PropTypes from 'prop-types';

import { ReplicaStatus } from '../replica-status';
import {
  ReplicaResourcesModel,
  ReplicaResourcesNormalizedModel,
  ReplicaResourcesNormalizedModelValidationMap,
} from '../replica-attributes';

export interface ReplicaSummaryModel {
  name: string;
  created: string;
  replicaStatus: {
    status: string;
  };
  restartCount?: number;
  statusMessage?: string;
  image?: string;
  imageId?: string;
  resources?: ReplicaResourcesModel;
}

export interface ReplicaSummaryNormalizedModel {
  name: string;
  created: Date;
  status: ReplicaStatus;
  restartCount?: number;
  statusMessage?: string;
  image?: string;
  imageId?: string;
  resources?: ReplicaResourcesNormalizedModel;
}

/* PropTypes validation map for ReplicaSummaryNormalizedModel */
export const ReplicaSummaryNormalizedModelValidationMap: PropTypes.ValidationMap<ReplicaSummaryNormalizedModel> =
  {
    name: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.oneOf(Object.values(ReplicaStatus)).isRequired,
    restartCount: PropTypes.number,
    statusMessage: PropTypes.string,
    image: PropTypes.string,
    imageId: PropTypes.string,
    resources: PropTypes.shape(
      ReplicaResourcesNormalizedModelValidationMap
    ) as PropTypes.Validator<ReplicaResourcesNormalizedModel>,
  };
