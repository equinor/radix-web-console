import { defineRequestActions } from '../state-utils/request';

export default Object.freeze({
  ...defineRequestActions('COMPONENT_START'),
  ...defineRequestActions('COMPONENT_STOP'),
});
