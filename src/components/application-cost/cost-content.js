import { Typography } from '@equinor/eds-core-react';
import * as moment from 'moment';
import * as PropTypes from 'prop-types';

import { ApplicationCostSetModelValidationMap } from '../../models/application-cost-set';
import { formatDateTimeYear } from '../../utils/datetime';

export const CostContent = ({ applicationCostSet }) =>
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

function getPeriod(appCostSet) {
  return `${formatDateTimeYear(moment(appCostSet.from).toDate())}
  - ${formatDateTimeYear(moment(appCostSet.to).toDate())}`;
}

function getCostByCpu(appCostSet) {
  return appCostSet.applicationCosts.length !== 0 &&
    !isNaN(appCostSet.applicationCosts[0].cost)
    ? `${appCostSet.applicationCosts[0].cost.toFixed(2)} ${
        appCostSet.applicationCosts[0].currency
      }`
    : 'No data';
}

CostContent.propTypes = {
  applicationCostSet: PropTypes.shape(ApplicationCostSetModelValidationMap),
};
