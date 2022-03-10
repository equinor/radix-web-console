import * as PropTypes from 'prop-types';

import {
  ApplicationCostModel,
  ApplicationCostModelValidationMap,
} from '../application-cost';

export interface ApplicationCostSetModel {
  applicationCosts: Array<ApplicationCostModel>;
  from: string;
  to: string;
  totalRequestedCpu?: number;
  totalRequestedMemory?: number;
}

/* PropTypes validation map for ApplicationCostSetModel */
export const ApplicationCostSetModelValidationMap: PropTypes.ValidationMap<ApplicationCostSetModel> =
  {
    applicationCosts: PropTypes.arrayOf<ApplicationCostModel>(
      PropTypes.shape(ApplicationCostModelValidationMap) as any
    ).isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    totalRequestedCpu: PropTypes.number,
    totalRequestedMemory: PropTypes.number,
  };
