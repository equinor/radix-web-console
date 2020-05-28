export const getDeployment = (state) => state.deployment;
export const getComponent = (state, componentName) =>
  state.deployment &&
  state.deployment.components &&
  state.deployment.components.find(
    (component) => component.name === componentName
  );
