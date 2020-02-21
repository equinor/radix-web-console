import { usePollingJson } from '../../effects';

const UsePollComponents = (appName, deploymentName) => {
  const encAppName = encodeURIComponent(appName);
  const encDeployName = encodeURIComponent(deploymentName);
  const url = `/applications/${encAppName}/deployments/${encDeployName}/components`;

  return usePollingJson(url);
};

export default UsePollComponents;
