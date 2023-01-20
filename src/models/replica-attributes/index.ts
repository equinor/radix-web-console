import * as PropTypes from 'prop-types';

export interface ReplicaNodeModel {
  gpu?: string;
  gpuCount?: string;
}

/* PropTypes validation map for ReplicaNodeModel */
export const ReplicaNodeModelValidationMap: PropTypes.ValidationMap<ReplicaNodeModel> =
  {
    gpu: PropTypes.string,
    gpuCount: PropTypes.string,
  };

export interface ReplicaResourceModel {
  cpu?: string;
  memory?: string;
}

/* PropTypes validation map for ReplicaResourceModel */
export const ReplicaResourceModelValidationMap: PropTypes.ValidationMap<ReplicaResourceModel> =
  {
    cpu: PropTypes.string,
    memory: PropTypes.string,
  };

export interface ReplicaResourcesModel {
  limits?: ReplicaResourceModel;
  requests?: ReplicaResourceModel;
}

/* PropTypes validation map for ReplicaResourcesModel */
export const ReplicaResourcesModelValidationMap: PropTypes.ValidationMap<ReplicaResourcesModel> =
  {
    limits: PropTypes.shape(ReplicaResourceModelValidationMap),
    requests: PropTypes.shape(ReplicaResourceModelValidationMap),
  };
