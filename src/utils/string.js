export const routeWithParams = (route, params) =>
  route.replace(/:(\w+)/g, (match, key) => params[key]);
