import actionCreators from './action-creators';
import { api } from '../../api/environment-alerting';
import { alertingSaga } from '../alerting-utils/sagas';

const environmentAlertingSaga = alertingSaga(
  'ENVIRONMENT_ALERTING',
  actionCreators,
  api
);
export default environmentAlertingSaga;
