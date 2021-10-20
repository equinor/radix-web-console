import { defineRequestActions } from '../state-utils/request';

export default Object.freeze({
  ENVIRONMENT_ALERTING_SNAPSHOT: 'ENVIRONMENT_ALERTING_SNAPSHOT',
  ...defineRequestActions('ENVIRONMENT_ALERTING_ENABLE'),
  ...defineRequestActions('ENVIRONMENT_ALERTING_DISABLE'),
  ...defineRequestActions('ENVIRONMENT_ALERTING_UPDATE'),
});
