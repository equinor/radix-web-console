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
  function getCostPercentageByCpu(applicationCostSet) {
    return applicationCostSet === null ||
      applicationCostSet.applicationCosts.length !== 0
      ? applicationCostSet.applicationCosts[0].costPercentageByCpu.toFixed(4) +
          ' %'
      : 'No data';
  }
  function costPercentageByMemory(applicationCostSet) {
    return applicationCostSet === null ||
      applicationCostSet.applicationCosts.length !== 0
      ? applicationCostSet.applicationCosts[0].costPercentageByMemory.toFixed(
          4
        ) + ' %'
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
          <td>{getCostPercentageByCpu(applicationCostSet)}</td>
        </tr>
        <tr>
          <td>Cost by memory</td>
          <td>{costPercentageByMemory(applicationCostSet)}</td>
        </tr>
      </tbody>
    </table>
  );
};

CostContent.propTypes = {
  applicationCostSet: PropTypes.shape(applicationCostSet),
};
