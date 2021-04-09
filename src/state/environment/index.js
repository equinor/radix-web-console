/**
 * Get the current environment
 * @param {Object} state The Redux store state
 */
export const getEnvironment = (state) =>
  state.environment && state.environment.instance;

export const getEnvironmentMeta = (state) =>
  state.environment && state.environment;

/**
 * Get branch name in the current environment
 * @param {Object} state The Redux store state
 * @returns {?String} Branch name value if any
 */
export const getBranchName = (state) => {
  const env = getEnvironment(state);

  if (!env || !env.branchMapping) {
    return null;
  }

  return env.branchMapping;
};

/**
 * Get a list of components from the active deployment in the current environment
 * @param {Object} state The Redux store state
 * @returns {?Array} Array of Components, or null if no active deployment
 */
export const getComponents = (state) => {
  const env = getEnvironment(state);

  if (!env || !env.activeDeployment) {
    return null;
  }

  return env.activeDeployment.components || [];
};

/**
 * Get a component from the active deployment in the current environment
 * @param {Object} state The Redux store state
 * @param {string} componentName The name of the component
 * @returns {?Component} Component, or null if no active deployment or no Component with the name provided
 */
export const getComponent = (state, componentName) => {
  const components = getComponents(state);

  if (!components) {
    return null;
  }

  return components.find((component) => component.name === componentName);
};

/**
 * Get a replica from the active deployment in the current environment
 * @param {Object} state The Redux store state
 * @param {string} componentName The name of the component
 * @param {string} replicaName The name of the replica
 * @returns {?Replica} Replica, or null if component or replica was not found
 */
export const getReplica = (state, componentName, replicaName) => {
  const component = getComponent(state, componentName);

  if (!component || !component.replicaList) {
    return null;
  }

  return component.replicaList.find((replica) => replica.name === replicaName);
};

/**
 * Get replica status for given replica
 * @param {Object} state The Redux store state
 * @param {string} componentName The name of the component
 * @param {string} replicaName The name of the replica
 * @returns {string} Replica status, or 'Unknown' if component or replica was not found
 */
export const getReplicaStatus = (state, componentName, replicaName) => {
  const replica = getReplica(state, componentName, replicaName);

  if (replica && replica.status) {
    return replica.status;
  }

  return 'Unknown';
};

/**
 * Get replica status message for given replica
 * @param {Object} state The Redux store state
 * @param {string} componentName The name of the component
 * @param {string} replicaName The name of the replica
 * @returns {?string} Replica status, or null if component or replica was not found
 */
export const getReplicaStatusMessage = (state, componentName, replicaName) => {
  const replica = getReplica(state, componentName, replicaName);

  if (replica && replica.statusMessage) {
    return replica.statusMessage;
  }

  return null;
};

/**
 * Retrive the name of the currently-active deployment in the current enviornment
 * @param {Object} state The Redux store state
 */
export const getActiveDeploymentName = (state) => {
  const env = getEnvironment(state);

  if (!env || !env.activeDeployment) {
    return null;
  }

  return env.activeDeployment.name;
};

export const getComponentSecret = (env, secretName, componentName) => {
  if (!env || !env.activeDeployment) {
    return null;
  }

  return env.secrets.find(
    (secret) => secret.name === secretName && secret.component === componentName
  );
};

export const getSecret = (state, componentName, secretName) => {
  return getComponentSecret(getEnvironment(state), secretName, componentName);
};
