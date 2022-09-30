import { defineRequestActions } from '../state-utils/request';

export default Object.freeze({
  APP_CHANGE_ADMIN: 'APP_CHANGE_ADMIN',
  APP_CHANGE_REPOSITORY: 'APP_CHANGE_REPOSITORY',
  APP_SNAPSHOT: 'APP_SNAPSHOT',
  ...defineRequestActions('APP_DELETE'),
  ...defineRequestActions('APP_MODIFY'),
});
