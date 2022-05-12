function fallbackCopyToClipboard(str: string): void {
  console.debug('Fallback Clipboard');

  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback Clipboard: unable to copy', err);
  }

  document.body.removeChild(el);
}

export function routeWithParams(
  route: string,
  params: { [key: string]: string | number | boolean },
  search?: { [key: string]: string | number | boolean }
): string {
  const url = route.replace(/:(\w+)/g, (_, k) => encodeURIComponent(params[k]));

  if (search) {
    return `${url}?${Object.keys(search)
      ?.map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(search[k])}`)
      .join('&')}`;
  }

  return url;
}

export function linkToGitHubBranch(repo: string, branch: string): string {
  return `${repo}/tree/${branch}`;
}

export function copyToClipboard(text: string): void {
  !navigator.clipboard
    ? fallbackCopyToClipboard(text)
    : navigator.clipboard.writeText(text);
}

export function pluraliser(
  singular: string,
  plural: string
): (unit: number) => string {
  return (unit) => (unit === 1 ? `${unit} ${singular}` : `${unit} ${plural}`);
}

export function smallDeploymentName(deploymentName: string): string {
  const deploymentRegEx = /.*-(.*)$/;
  const match = deploymentRegEx.exec(deploymentName);

  if (!match) {
    console.warn('Cannot parse deployment name', deploymentName);
    return '';
  }

  return match[1];
}

export function smallJobName(jobName: string): string {
  return jobName.slice(-5);
}

export function smallReplicaName(replicaName: string): string {
  return replicaName.slice(-5);
}

export function smallScheduledJobName(scheduledJob: string): string {
  return scheduledJob.slice(-8);
}

export function smallScheduledBatchName(scheduledBatch: string): string {
  return scheduledBatch.slice(-8);
}
