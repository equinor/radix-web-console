import { getComponent } from '../environment';

/**
 * Get component status for given component
 * @param {Object} state The Redux store state
 * @param {string} componentName The name of the component
 * @returns {string} Component status, or 'Unknown' if component was not found
 */
export const getComponentStatus = (state, componentName) => {
  const component = getComponent(state, componentName);

  if (component && component.status) {
    return component.status;
  }

  return 'Unknown';
};
