import * as PropTypes from 'prop-types';

import { ReplicaStatus } from '../replica-status';
import {
  ResourceRequirementsModel,
  ResourceRequirementsModelValidationMap,
} from '../resource-requirements';
import { RawModel } from '../../../model-types';

export interface ReplicaSummaryModel {
  name: string;
  created: string;
  containerStarted?: string;
  replicaStatus: {
    status: string;
  };
  restartCount?: number;
  statusMessage?: string;
  image?: string;
  imageId?: string;
  resources?: RawModel<ResourceRequirementsModel>;
}

export interface ReplicaSummaryNormalizedModel {
  name: string;
  created: Date;
  containerStarted?: Date;
  status: ReplicaStatus;
  restartCount?: number;
  statusMessage?: string;
  image?: string;
  imageId?: string;
  resources?: ResourceRequirementsModel;
}

/* PropTypes validation map for ReplicaSummaryNormalizedModel */
export const ReplicaSummaryNormalizedModelValidationMap: PropTypes.ValidationMap<ReplicaSummaryNormalizedModel> =
  {
    name: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    containerStarted: PropTypes.instanceOf(Date),
    status: PropTypes.oneOf(Object.values(ReplicaStatus)).isRequired,
    restartCount: PropTypes.number,
    statusMessage: PropTypes.string,
    image: PropTypes.string,
    imageId: PropTypes.string,
    resources: PropTypes.shape(
      ResourceRequirementsModelValidationMap
    ) as PropTypes.Validator<ResourceRequirementsModel>,
  };
