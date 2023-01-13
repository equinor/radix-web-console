import { defineRequestActions } from '../state-utils/request';

export const actionTypes = Object.freeze({
  ENVIRONMENT_SNAPSHOT: 'ENVIRONMENT_SNAPSHOT',
  ...defineRequestActions('ENVIRONMENT_DELETE'),
});

export default actionTypes;
