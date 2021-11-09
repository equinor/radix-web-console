import actionCreators from './action-creators';
import { api } from '../../api/application-alerting';
import { alertingSaga } from '../alerting-utils/sagas';

const applicationAlertingSaga = alertingSaga(
  'APPLICATION_ALERTING',
  actionCreators,
  api
);
export default applicationAlertingSaga;
