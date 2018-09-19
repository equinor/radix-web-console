const clusterDomain = require('../config.json').clusterDomain;

export const routeWithParams = (route, params) =>
  route.replace(/:(\w+)/g, (match, key) => params[key]);

export const linkToComponent = (componentName, appName, env) => {
  // We are currently creating domain names that use only the last 5 characters
  // of the cluster name, due to DNS entry length restrictions
  const domainParts = clusterDomain.split('.');
  domainParts[0] = domainParts[0].slice(-5);

  const domain = domainParts.join('.');
  return `https://${componentName}-${appName}-${env}.${domain}`;
};
