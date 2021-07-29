import PropTypes from 'prop-types';
import React from 'react';
import applicationCostSet from '../../models/application-cost-set';
import moment from 'moment';
import { formatDateTimeYear } from '../../utils/datetime';
import { Typography } from '@equinor/eds-core-react';

export const CostContent = ({ applicationCostSet }) => {
  if (!applicationCostSet) {
    return <Typography variant="caption">No data</Typography>;
  }

  function getPeriod(applicationCostSet) {
    return `${formatDateTimeYear(moment(applicationCostSet.from).toDate())}
    - ${formatDateTimeYear(moment(applicationCostSet.to).toDate())}`;
  }

  function getCostByCpu(applicationCostSet) {
    if (applicationCostSet === null) return 'No data';
    return applicationCostSet.applicationCosts.length !== 0 &&
      !isNaN(applicationCostSet.applicationCosts[0].cost)
      ? applicationCostSet.applicationCosts[0].cost.toFixed(2) +
          ' ' +
          applicationCostSet.applicationCosts[0].currency
      : 'No data';
  }

  return (
    <>
      <div>
        <Typography variant="overline">Period</Typography>
        <Typography group="input" variant="text">
          {getPeriod(applicationCostSet)}
        </Typography>
      </div>
      <div>
        <Typography variant="overline">Cost</Typography>
        <Typography group="input" variant="text">
          {getCostByCpu(applicationCostSet)}
        </Typography>
      </div>
    </>
  );
};

CostContent.propTypes = {
  applicationCostSet: PropTypes.shape(applicationCostSet),
};
