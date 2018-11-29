import { defineRequestActions } from '../state-utils/request';

export default Object.freeze({
  ...defineRequestActions('APPS_ADD'),
  ...defineRequestActions('APPS_DELETE'),

  APPS_LIST_ADD: 'APPS_LIST_ADD',
  APPS_LIST_REMOVE: 'APPS_LIST_REMOVE',
  APPS_LIST_UPDATE: 'APPS_LIST_UPDATE',
});
