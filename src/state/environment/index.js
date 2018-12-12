import get from 'lodash/get';
import find from 'lodash/find';

/**
 * Get the current environment
 * @param {Object} state The Redux store state
 */
export const getEnvironment = state => state.environment;

/**
 * Get a list of components from the active deployment in the current environment
 * @param {Object} state The Redux store state
 * @returns {?Array} Array of Components, or null if no active deployment
 */
export const getComponents = state => {
  const env = getEnvironment(state);

  if (!env || !env.activeDeployment) {
    return null;
  }

  return env.activeDeployment.components || [];
};

/**
 * Get a components from the active deployment in the current environment
 * @param {Object} state The Redux store state
 * @param {string} componentName The name of the component
 * @returns {?Component} Component, or null if no active deployment or no Component with the name provided
 */
export const getComponent = (state, componentName) => {
  const components = getComponents(state);

  if (!components) {
    return null;
  }

  return components.find(component => component.name === componentName);
};

/**
 * Get replica status for given replica
 * @param {Object} state The Redux store state
 * @param {string} componentName The name of the component
 * @param {string} replicaName The name of the replica
 * @returns {?string} Replica status, or null if component or replica was not found
 */
export const getReplicaStatus = (state, componentName, replicaName) => {
  const comps = get(state, 'environment.activeDeployment.components');
  const comp = find(comps, { name: componentName });
  const replicas = get(comp, 'replicaList');
  const replica = find(replicas, { name: replicaName });
  return get(replica, 'replicaStatus.status');
};
