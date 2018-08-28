import { defineRequestActions } from '../state-utils/request';

export default Object.freeze({
  SECRETS_LIST_ADD: 'SECRETS_LIST_ADD',
  SECRETS_LIST_REMOVE: 'SECRETS_LIST_REMOVE',
  SECRETS_LIST_UPDATE: 'SECRETS_LIST_UPDATE',
  ...defineRequestActions('SECRETS_SAVE'),
});
