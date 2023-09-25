import * as PropTypes from 'prop-types';

import { ReplicaModel, ReplicaModelValidationMap } from '../replica';

export type InventoryResponseModel = {
  replicas: Array<ReplicaModel>;
};

/* PropTypes validation map for ComponentInventoryResponseModel */
export const InventoryResponseModelValidationMap: PropTypes.ValidationMap<InventoryResponseModel> =
  {
    replicas: PropTypes.arrayOf(
      PropTypes.shape(
        ReplicaModelValidationMap
      ) as PropTypes.Validator<ReplicaModel>
    ).isRequired,
  };
