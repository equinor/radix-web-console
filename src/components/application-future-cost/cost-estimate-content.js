import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';

import { ApplicationCostModelValidationMap } from '../../models/application-cost';
import { formatDateTimeYear } from '../../utils/datetime';

export const CostEstimateContent = ({ applicationCost }) =>
  applicationCost ? (
    <>
      <div className="grid grid--gap-small">
        <Typography variant="overline">Period</Typography>
        <Typography group="input" variant="text">
          {getPeriod()}
        </Typography>
      </div>
      <div className="grid grid--gap-small">
        <Typography variant="overline">Cost</Typography>
        <Typography group="input" variant="text">
          {getCostEstimate(applicationCost)}
        </Typography>
      </div>
    </>
  ) : (
    <Typography variant="caption">No data</Typography>
  );

function getPeriod() {
  const today = moment();
  const nextMonth = moment(today).add(30, 'days');
  return `${formatDateTimeYear(today.toDate())}
  - ${formatDateTimeYear(nextMonth.toDate())}`;
}

function getCostEstimate(appCost) {
  return !isNaN(appCost.cost)
    ? `${appCost.cost.toFixed()} ${appCost.currency}`
    : 'No data';
}

CostEstimateContent.propTypes = {
  applicationCost: PropTypes.shape(ApplicationCostModelValidationMap),
};
