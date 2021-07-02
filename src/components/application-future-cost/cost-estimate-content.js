import applicationCost from '../../models/application-cost';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { formatDateTimeYear } from '../../utils/datetime';

export const CostEstimateContent = ({ applicationCost }) => {
  if (!applicationCost) {
    return <table></table>;
  }

  function getPeriod() {
    var today = moment();
    var nextMonth = moment(today).add(30, 'days');
    return `${formatDateTimeYear(today.toDate())}
    - ${formatDateTimeYear(nextMonth.toDate())}`;
  }

  function getCostEstimate(applicationCost) {
    if (applicationCost === null) return 'No Data';
    return applicationCost.cost.length !== 0 && !isNaN(applicationCost.cost)
      ? applicationCost.cost.toFixed() + ' ' + applicationCost.currency
      : 'No data';
  }

  return (
    <>
      <div>
        <p className="overline">Period</p>
        <p className="body_short">{getPeriod()}</p>
      </div>
      <div>
        <p className="overline">Cost</p>
        <p className="body_short">{getCostEstimate(applicationCost)}</p>
      </div>
    </>
  );
};

CostEstimateContent.propTypes = {
  applicationCost: PropTypes.shape(applicationCost),
};
