import PropTypes from 'prop-types';
import React from 'react';
import applicationCostSet from '../../models/application-cost-set';
import format from 'date-fns/format';

export const CostContent = ({ applicationCostSet }) => {
  function getPeriod(applicationCostSet) {
    return `${format(
      new Date(applicationCostSet.from),
      'DD.MM.YYYY HH:mm'
    )} - ${format(new Date(applicationCostSet.to), 'DD.MM.YYYY HH:mm')}`;
  }
  // function getCostPercentageByCpu(applicationCostSet) {
  //   return applicationCostSet === null ||
  //     applicationCostSet.applicationCosts.length !== 0
  //     ? applicationCostSet.applicationCosts[0].costPercentageByCpu.toFixed(4) +
  //         ' %'
  //     : 'No data';
  // }
  function getCostByCpu(applicationCostSet) {
    if (applicationCostSet === null) return 'No data';
    return applicationCostSet.applicationCosts.length !== 0 &&
      !isNaN(applicationCostSet.applicationCosts[0].cost)
      ? applicationCostSet.applicationCosts[0].cost.toFixed(2) +
          ' ' +
          applicationCostSet.applicationCosts[0].currency
      : 'No data';
  }
  // function costPercentageByMemory(applicationCostSet) {
  //   return applicationCostSet === null ||
  //     applicationCostSet.applicationCosts.length !== 0
  //     ? applicationCostSet.applicationCosts[0].costPercentageByMemory.toFixed(
  //         4
  //       ) + ' %'
  //     : 'No data';
  // }
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
