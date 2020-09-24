import applicationCost from '../../models/application-cost';
import PropTypes from 'prop-types';
import React from 'react';

export const CostEstimateContent = ({ applicationCost }) => {
  if (!applicationCost) {
    return <table></table>;
  }

  function getPeriod() {
    var today = new Date();
    var nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    return `${today.toLocaleDateString()} - ${nextMonth.toLocaleDateString()}`;
  }

  function getCostEstimate(applicationCost) {
    if (applicationCost === null) return 'No Data';
    return applicationCost.cost.length !== 0 && !isNaN(applicationCost.cost)
      ? applicationCost.cost.toFixed() + ' ' + applicationCost.currency
      : 'No data';
  }

  return (
    <table>
      <tbody>
        <tr>
          <td width="120">Period</td>
          <td>{getPeriod()}</td>
        </tr>
        <tr>
          <td>Cost</td>
          <td>{getCostEstimate(applicationCost)}</td>
        </tr>
      </tbody>
    </table>
  );
};

CostEstimateContent.propTypes = {
  applicationCost: PropTypes.shape(applicationCost),
};
