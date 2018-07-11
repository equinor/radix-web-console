export const getPods = state => state.pods;

export const getPod = (state, podname) =>
  state.pods.find(pod => pod.metadata.name === podname);
