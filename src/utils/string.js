import ColorHash from 'color-hash';

import configHandler from '../utils/config';

export const routeWithParams = (route, params, search) => {
  let url = route.replace(/:(\w+)/g, (match, key) => params[key]);

  if (search) {
    const searchParams = [];

    for (const key in search) {
      searchParams.push(`${key}=${search[key]}`);
    }

    return `${url}?${searchParams.join('&')}`;
  }

  return url;
};

export const linkToComponent = (componentName, appName, env) => {
  return `https://${componentName}-${appName}-${env}.${configHandler.getDomain()}`;
};

export const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const themedColor = (() => {
  const colorHashThemedColor = new ColorHash({
    lightness: 0.66,
    saturation: 0.25,
  });

  return str => colorHashThemedColor.hex(str);
})();

export const pluraliser = (singular, plural) => unit =>
  unit === 1 ? `${unit} ${singular}` : `${unit} ${plural}`;

export const smallDeploymentName = (() => {
  const deploymentNameRegEx = /^.*?-.*?-(.*)$/;
  return deploymentName => {
    const match = deploymentNameRegEx.exec(deploymentName);
    if (!match) {
      console.warn('Cannot parse deployment name', deploymentName);
      return '';
    }

    return match[1];
  };
})();

export const smallJobName = jobName => jobName.slice(-5);
