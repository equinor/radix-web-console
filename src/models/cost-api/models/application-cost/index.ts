import * as PropTypes from 'prop-types';

export interface ApplicationCostModel {
  name: string;
  owner: string;
  creator: string;
  wbs?: string;
  costPercentageByCpu?: number;
  costPercentageByMemory?: number;
  comment?: string;
  cost?: number;
  currency?: string;
}

/* PropTypes validation map for ApplicationCostModel */
export const ApplicationCostModelValidationMap: PropTypes.ValidationMap<ApplicationCostModel> =
  {
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    wbs: PropTypes.string,
    costPercentageByCpu: PropTypes.number,
    costPercentageByMemory: PropTypes.number,
    comment: PropTypes.string,
    cost: PropTypes.number,
    currency: PropTypes.string,
  };
