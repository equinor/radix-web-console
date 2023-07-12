import * as PropTypes from 'prop-types';

import { PodStateModel, PodStateModelValidationMap } from '../pod-state';

export interface ObjectStateModel {
  pod?: PodStateModel;
}

/* PropTypes validation map for ObjectStateModel */
export const ObjectStateModelValidationMap: PropTypes.ValidationMap<ObjectStateModel> =
  {
    pod: PropTypes.shape(
      PodStateModelValidationMap
    ) as PropTypes.Validator<PodStateModel>,
  };
