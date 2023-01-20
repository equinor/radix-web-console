import * as PropTypes from 'prop-types';

import { RawModel } from '../model-types';
import {
  ReplicaResourcesModel,
  ReplicaResourcesModelValidationMap,
} from '../replica-attributes';
import { ReplicaStatus } from '../replica-status';

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
  resources?: RawModel<ReplicaResourcesModel>;
}

export interface ReplicaSummaryNormalizedModel {
  name: string;
  created: Date;
  status: ReplicaStatus;
  restartCount?: number;
  statusMessage?: string;
  image?: string;
  imageId?: string;
  resources?: ReplicaResourcesModel;
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
      ReplicaResourcesModelValidationMap
    ) as PropTypes.Validator<ReplicaResourcesModel>,
  };
