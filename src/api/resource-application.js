export const makeUrl = appName =>
  `/applications/${encodeURIComponent(appName)}`;

const regexp = new RegExp('^/applications/([^/]+)$');
export const urlMatches = resource => resource.match(regexp);
