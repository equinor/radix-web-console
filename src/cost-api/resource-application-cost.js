export const makeUrl = (appName) =>
  `/totalcost/${encodeURIComponent(
    appName
  )}?fromTime=2020-03-18&toTime=2020-09-18`;

const regexp = new RegExp('^/totalcost/([^/]+)$');
export const urlMatches = (resource) => resource.match(regexp);
