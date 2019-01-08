import { defineRequestActions } from '../state-utils/request';

export default Object.freeze({
  APPS_ADD_REQUEST: 'APPS_ADD_REQUEST',
  APPS_SNAPSHOT: 'APPS_SNAPSHOT',
  APPS_ADD: 'APPS_ADD',
  APPS_MODIFY: 'APPS_MODIFY',
  APPS_REMOVE: 'APPS_REMOVE',
  ...defineRequestActions('APPS_DELETE'),
});
