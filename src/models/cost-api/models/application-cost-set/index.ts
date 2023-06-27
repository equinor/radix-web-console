import * as PropTypes from 'prop-types';

import {
  ApplicationCostModel,
  ApplicationCostModelValidationMap,
} from '../application-cost';

export interface ApplicationCostSetModel {
  from: Date;
  to: Date;
  applicationCosts: Array<ApplicationCostModel>;
  totalRequestedCpu?: number;
  totalRequestedMemory?: number;
}

/* PropTypes validation map for ApplicationCostSetModel */
export const ApplicationCostSetModelValidationMap: PropTypes.ValidationMap<ApplicationCostSetModel> =
  {
    from: PropTypes.instanceOf(Date).isRequired,
    to: PropTypes.instanceOf(Date).isRequired,
    applicationCosts: PropTypes.arrayOf(
      PropTypes.shape(
        ApplicationCostModelValidationMap
      ) as PropTypes.Validator<ApplicationCostModel>
    ).isRequired,
    totalRequestedCpu: PropTypes.number,
    totalRequestedMemory: PropTypes.number,
  };
