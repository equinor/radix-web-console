export const makeUrl = (appName, from, to) =>
  `/totalcost/${encodeURIComponent(appName)}?fromTime=${from}&toTime=${to}`;

const regexp = new RegExp('^/totalcost/([^/]+)$');
export const urlMatches = (resource) => resource.match(regexp);
