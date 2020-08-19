import get from 'lodash/get';

export const getApplicationCostState = (state) => get(state, 'applicationCost');
export const getApplicationCost = (state) =>
  get(state, 'applicationCost.instance');
