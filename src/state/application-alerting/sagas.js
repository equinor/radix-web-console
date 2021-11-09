import actionCreators from './action-creators';
import { api } from '../../api/application-alerting';
import { alertingSagaFactory } from '../alerting-utils/sagas';

const {
  alertingSaga,
  enableAlertingFlow,
  disableAlertingFlow,
  updateAlertingFlow,
} = alertingSagaFactory('APPLICATION_ALERTING', actionCreators, api);

export { enableAlertingFlow, disableAlertingFlow, updateAlertingFlow };
export default alertingSaga;
