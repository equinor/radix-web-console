import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  ApplicationCostSetModel,
  ApplicationCostSetModelValidationMap,
} from '../../models/cost-api/models/application-cost-set';
import { formatDateTimeYear } from '../../utils/datetime';

export interface CostContentProps {
  applicationCostSet?: ApplicationCostSetModel;
}

export const CostContent: FunctionComponent<CostContentProps> = ({
  applicationCostSet,
}) =>
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

function getPeriod({ from, to }: ApplicationCostSetModel): string {
  return `${formatDateTimeYear(from)} - ${formatDateTimeYear(to)}`;
}

function getCostByCpu({ applicationCosts }: ApplicationCostSetModel): string {
  return !Number.isNaN(applicationCosts?.[0]?.cost ?? NaN)
    ? `${applicationCosts[0].cost.toFixed(2)} ${applicationCosts[0].currency}`
    : 'No data';
}

CostContent.propTypes = {
  applicationCostSet: PropTypes.shape(
    ApplicationCostSetModelValidationMap
  ) as PropTypes.Validator<ApplicationCostSetModel>,
};
