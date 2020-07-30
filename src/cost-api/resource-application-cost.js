export const makeUrl = (appName) => `/totalcost/${encodeURIComponent(appName)}`;

const regexp = new RegExp('^/totalcost/([^/]+)$');
export const urlMatches = (resource) => resource.match(regexp);
