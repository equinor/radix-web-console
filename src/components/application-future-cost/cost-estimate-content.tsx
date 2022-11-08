import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import {
  ApplicationCostModel,
  ApplicationCostModelValidationMap,
} from '../../models/application-cost';
import { formatDateTimeYear } from '../../utils/datetime';

export interface CostEstimateContentProps {
  applicationCost: ApplicationCostModel;
}

export const CostEstimateContent = ({
  applicationCost,
}: CostEstimateContentProps): JSX.Element =>
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

function getPeriod(): string {
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setDate(nextMonth.getDate() + 30);

  return `${formatDateTimeYear(today)} - ${formatDateTimeYear(nextMonth)}`;
}

function getCostEstimate({ cost, currency }: ApplicationCostModel): string {
  return !Number.isNaN(cost) ? `${cost.toFixed()} ${currency}` : 'No data';
}

CostEstimateContent.propTypes = {
  applicationCost: PropTypes.shape(ApplicationCostModelValidationMap),
} as PropTypes.ValidationMap<CostEstimateContentProps>;
