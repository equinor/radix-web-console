import { defineRequestActions } from '../state-utils/request';

export default Object.freeze({
  ...defineRequestActions('APPS_ADD'),
  ...defineRequestActions('APPS_DELETE'),
});
