import actionCreators from './action-creators';
import { api } from '../../api/environment-alerting';
import { alertingSagaFactory } from '../alerting-utils/sagas';

const {
  alertingSaga,
  enableAlertingFlow,
  disableAlertingFlow,
  updateAlertingFlow,
} = alertingSagaFactory('ENVIRONMENT_ALERTING', actionCreators, api);

export { enableAlertingFlow, disableAlertingFlow, updateAlertingFlow };
export default alertingSaga;
