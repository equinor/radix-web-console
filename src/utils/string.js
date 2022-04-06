export const routeWithParams = (route, params, search) => {
  let url = route.replace(/:(\w+)/g, (match, key) =>
    encodeURIComponent(params[key])
  );

  if (search) {
    const searchParams = [];

    for (const key in search) {
      searchParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`
      );
    }

    return `${url}?${searchParams.join('&')}`;
  }

  return url;
};

export const linkToGitHubBranch = (repo, branch) => {
  return `${repo}/tree/${branch}`;
};

export const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const pluraliser = (singular, plural) => (unit) =>
  unit === 1 ? `${unit} ${singular}` : `${unit} ${plural}`;

export const smallDeploymentName = (() => {
  const deploymentNameRegEx = /.*-(.*)$/;
  return (deploymentName) => {
    const match = deploymentNameRegEx.exec(deploymentName);
    if (!match) {
      console.warn('Cannot parse deployment name', deploymentName);
      return '';
    }

    return match[1];
  };
})();

export const smallJobName = (jobName) => jobName.slice(-5);

export const smallReplicaName = (replicaName) => replicaName.slice(-5);

export const smallScheduledJobName = (scheduledJob) => scheduledJob.slice(-8);

export const smallScheduledBatchName = (scheduledBatch) =>
  scheduledBatch.slice(-8);
