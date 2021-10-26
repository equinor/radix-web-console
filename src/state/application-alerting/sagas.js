import actionCreators from './action-creators';
import { api } from '../../api/application-alerting';
import { alertingSaga } from '../alerting-utils/sagas';

const componentSaga = alertingSaga('APPLICATION_ALERTING', actionCreators, api);
export default componentSaga;
