export const getPods = state => state.pods;
export const getPod = (state, podName) =>
  state.pods.find(pod => pod.metadata.name === podName);
