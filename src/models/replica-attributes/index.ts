import * as PropTypes from 'prop-types';

export interface ReplicaNodeModel {
  gpu?: string;
  gpuCount?: string;
}

export interface ReplicaNodeNormalizedModel {
  gpu?: string;
  gpuCount?: string;
}

/* PropTypes validation map for ReplicaNodeNormalizedModel */
export const ReplicaNodeNormalizedModelValidationMap: PropTypes.ValidationMap<ReplicaNodeNormalizedModel> =
  {
    gpu: PropTypes.string,
    gpuCount: PropTypes.string,
  };

export interface ReplicaResourceModel {
  cpu?: string;
  memory?: string;
}

export interface ReplicaResourceNormalizedModel {
  cpu?: string;
  memory?: string;
}

/* PropTypes validation map for ReplicaResourceNormalizedModel */
export const ReplicaResourceNormalizedModelValidationMap: PropTypes.ValidationMap<ReplicaResourceNormalizedModel> =
  {
    cpu: PropTypes.string,
    memory: PropTypes.string,
  };

export interface ReplicaResourcesModel {
  limits: ReplicaResourceModel;
  requests: ReplicaResourceModel;
}

export interface ReplicaResourcesNormalizedModel {
  limits?: ReplicaResourceModel;
  requests?: ReplicaResourceModel;
}

/* PropTypes validation map for ReplicaResourcesNormalizedModel */
export const ReplicaResourcesNormalizedModelValidationMap: PropTypes.ValidationMap<ReplicaResourcesNormalizedModel> =
  {
    limits: PropTypes.shape(
      ReplicaResourceNormalizedModelValidationMap
    ) as PropTypes.Validator<ReplicaResourceModel>,
    requests: PropTypes.shape(
      ReplicaResourceNormalizedModelValidationMap
    ) as PropTypes.Validator<ReplicaResourceModel>,
  };
