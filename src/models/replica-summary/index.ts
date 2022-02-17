import * as PropTypes from 'prop-types';

import { ReplicaStatusEnum } from '../replica-status-enum';

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
}

export interface ReplicaSummaryNormalizedModel {
  name: string;
  created: Date;
  status: ReplicaStatusEnum;
  restartCount?: number;
  statusMessage?: string;
  image?: string;
  imageId?: string;
}

/* PropTypes validation map for ReplicaSummaryNormalizedModel */
export const ReplicaSummaryNormalizedModelValidationMap: PropTypes.ValidationMap<ReplicaSummaryNormalizedModel> =
  {
    name: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.oneOf(Object.values(ReplicaStatusEnum)).isRequired,
    restartCount: PropTypes.number,
    statusMessage: PropTypes.string,
    image: PropTypes.string,
    imageId: PropTypes.string,
  };
