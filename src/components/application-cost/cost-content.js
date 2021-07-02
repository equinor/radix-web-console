import PropTypes from 'prop-types';
import React from 'react';
import applicationCostSet from '../../models/application-cost-set';
import moment from 'moment';
import { formatDateTimeYear } from '../../utils/datetime';

export const CostContent = ({ applicationCostSet }) => {
  if (!applicationCostSet) {
    return <table></table>;
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
        <p className="overline">Period</p>
        <p className="body_short">{getPeriod(applicationCostSet)}</p>
      </div>
      <div>
        <p className="overline">Cost</p>
        <p className="body_short">{getCostByCpu(applicationCostSet)}</p>
      </div>
    </>
  );
};

CostContent.propTypes = {
  applicationCostSet: PropTypes.shape(applicationCostSet),
};
