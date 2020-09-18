import applicationCost from '../../models/application-cost';
import PropTypes from 'prop-types';
import React from 'react';

export const CostEstimateContent = ({ applicationCost }) => {
  if (!applicationCost) {
    return <table></table>;
  }

  function getPeriod() {
    let today = new Date();
    let nextMonth = new Date(today.getDate() + 30);
    return `${today.getDate()} - ${nextMonth.getDate()}`;
  }

  function getCostEstimate(applicationCost) {
    if (applicationCost === null) return 'No Data';
    return applicationCost.cost;
  }

  return (
    <table>
      <tbody>
        <tr>
          <td width="120">Period</td>
          <td>{getPeriod()}</td>
        </tr>
        <tr>
          <td>Cost Estimate</td>
          <td>{getCostEstimate}</td>
        </tr>
      </tbody>
    </table>
  );
};

CostEstimateContent.propTypes = {
  applicationCost: PropTypes.shape(applicationCost),
};
