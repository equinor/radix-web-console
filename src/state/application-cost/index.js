import get from 'lodash/get';
import { makeLocalGetter } from '../../utils/object';

export const getApplicationCostState = (state) => get(state, 'applicationCost');
export const getApplicationCost = (state) => get(state, 'applicationCost.instance');

const applicationCostInstanceGetter = makeLocalGetter('applicationCost.instance');
