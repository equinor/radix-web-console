import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import {
  ApplicationCostSetModel,
  ApplicationCostSetModelValidationMap,
} from '../../models/application-cost-set';
import { formatDateTimeYear } from '../../utils/datetime';

export interface CostContentProps {
  applicationCostSet: ApplicationCostSetModel;
}

export const CostContent = ({
  applicationCostSet,
}: CostContentProps): JSX.Element =>
  applicationCostSet ? (
    <>
      <div className="grid grid--gap-small">
        <Typography variant="overline">Period</Typography>
        <Typography group="input" variant="text">
          {getPeriod(applicationCostSet)}
        </Typography>
      </div>
      <div className="grid grid--gap-small">
        <Typography variant="overline">Cost</Typography>
        <Typography group="input" variant="text">
          {getCostByCpu(applicationCostSet)}
        </Typography>
      </div>
    </>
  ) : (
    <Typography variant="caption">No data</Typography>
  );

function getPeriod(appCostSet: ApplicationCostSetModel): string {
  return `${formatDateTimeYear(
    new Date(appCostSet.from)
  )} - ${formatDateTimeYear(new Date(appCostSet.to))}`;
}

function getCostByCpu({ applicationCosts }: ApplicationCostSetModel): string {
  return !Number.isNaN(applicationCosts?.[0].cost)
    ? `${applicationCosts[0].cost.toFixed(2)} ${applicationCosts[0].currency}`
    : 'No data';
}

CostContent.propTypes = {
  applicationCostSet: PropTypes.shape(ApplicationCostSetModelValidationMap),
} as PropTypes.ValidationMap<CostContentProps>;
