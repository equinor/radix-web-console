export const makeUrl = (appName) => `/totalcost/${encodeURIComponent(appName)}`;

const regexp = new RegExp('^/applications/([^/]+)$');
export const urlMatches = (resource) => resource.match(regexp);
