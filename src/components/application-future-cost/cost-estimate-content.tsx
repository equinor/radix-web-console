import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';

import {
  ApplicationCostModel,
  ApplicationCostModelValidationMap,
} from '../../models/application-cost';
import { formatDateTimeYear } from '../../utils/datetime';

export interface CostEstimateContentProps {
  applicationCost: ApplicationCostModel;
}

export const CostEstimateContent = (
  props: CostEstimateContentProps
): JSX.Element =>
  props.applicationCost ? (
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
          {getCostEstimate(props.applicationCost)}
        </Typography>
      </div>
    </>
  ) : (
    <Typography variant="caption">No data</Typography>
  );

function getPeriod() {
  const today = moment();
  const nextMonth = moment(today).add(30, 'days');

  return `${formatDateTimeYear(today.toDate())} - ${formatDateTimeYear(
    nextMonth.toDate()
  )}`;
}

function getCostEstimate(appCost: ApplicationCostModel) {
  return !isNaN(appCost.cost)
    ? `${appCost.cost.toFixed()} ${appCost.currency}`
    : 'No data';
}

CostEstimateContent.propTypes = {
  applicationCost: PropTypes.shape(ApplicationCostModelValidationMap),
} as PropTypes.ValidationMap<CostEstimateContentProps>;
