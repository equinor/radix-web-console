import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('environment');

/**
 * Get the current environment
 * @param {Object} state The Redux store state
 */
export const getEnvironment = state => localGetter(state);

/**
 * Get a list of components from the active deployment in the current environment
 * @param {Object} state The Redux store state
 * @returns {?Array} Array of Components, or null if no active deployment
 */
export const getComponents = state => {
  const env = getEnvironment(state);

  if (!env.activeDeployment) {
    return null;
  }

  return env.activeDeployment.components || [];
};
