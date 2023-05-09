import * as PropTypes from 'prop-types';

import { ContainerModel, ContainerModelValidationMap } from '../container';

export type ReplicaModel = {
  name: string;
  creationTimestamp?: Date;
  containers: Array<ContainerModel>;
};

/* PropTypes validation map for ReplicaModel */
export const ReplicaModelValidationMap: PropTypes.ValidationMap<ReplicaModel> =
  {
    name: PropTypes.string.isRequired,
    creationTimestamp: PropTypes.instanceOf(Date),
    containers: PropTypes.arrayOf(
      PropTypes.shape(
        ContainerModelValidationMap
      ) as PropTypes.Validator<ContainerModel>
    ).isRequired,
  };
