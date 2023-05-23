import * as PropTypes from 'prop-types';

import { ReplicaModel, ReplicaModelValidationMap } from '../replica';

export type ComponentInventoryResponseModel = {
  replicas: Array<ReplicaModel>;
};

/* PropTypes validation map for ComponentInventoryResponseModel */
export const ComponentInventoryResponseModelValidationMap: PropTypes.ValidationMap<ComponentInventoryResponseModel> =
  {
    replicas: PropTypes.arrayOf(
      PropTypes.shape(
        ReplicaModelValidationMap
      ) as PropTypes.Validator<ReplicaModel>
    ).isRequired,
  };
