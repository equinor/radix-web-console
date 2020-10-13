import PropTypes from 'prop-types';
import React from 'react';
import applicationCostSet from '../../models/application-cost-set';
import moment from 'moment';

export const CostContent = ({ applicationCostSet }) => {
  if (!applicationCostSet) {
    return <table></table>;
  }

  function getPeriod(applicationCostSet) {
    return `${moment(applicationCostSet.from).format('DD MMM YYYY')}
    - ${moment(applicationCostSet.to).format('DD MMM YYYY')}`;
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
    <table>
      <tbody>
        <tr>
          <td width="120">Period</td>
          <td>{getPeriod(applicationCostSet)}</td>
        </tr>
        <tr>
          <td>Cost by CPU</td>
          <td>{getCostByCpu(applicationCostSet)}</td>
        </tr>
      </tbody>
    </table>
  );
};

CostContent.propTypes = {
  applicationCostSet: PropTypes.shape(applicationCostSet),
};
