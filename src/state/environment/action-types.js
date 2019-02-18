import { defineRequestActions } from '../state-utils/request';

export default Object.freeze({
  ENVIRONMENT_SNAPSHOT: 'ENVIRONMENT_SNAPSHOT',
  ...defineRequestActions('ENVIRONMENT_DELETE'),
});
