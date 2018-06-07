import AuthenticationContext from 'adal-angular';

import config, { getResource } from './config';

const authContext = new AuthenticationContext({
  clientId: config.azureADClientId,
  tenant: config.azureADTenant,
});

function acquireToken(azureADClientId) {
  return new Promise((resolve, reject) => {
    authContext.acquireToken(azureADClientId, (error, token) => {
      if (error || !token) {
        const reason =
          error !== undefined ? error : Error('Unable to acquire a token');
        reject(reason);
      } else {
        resolve(token);
      }
    });
  });
}

export function login(resource) {
  authContext.login();
}

export function logout() {
  authContext.logOut();
}

export function getSignedInUser() {
  return authContext.getCachedUser();
}

export function isAuthenticated() {
  const user = authContext.getCachedUser();
  if (!user) return Promise.reject();
  const idToken = authContext.getCachedToken(authContext.config.loginResource);
  if (!idToken) return Promise.reject();
  return Promise.resolve(idToken);
}

export function authorize(resourceId) {
  const resource = getResource(resourceId);
  if (!resource) {
    return Promise.reject(`No resource with ID '${resourceId}'`);
  }
  return isAuthenticated().then(
    () => acquireToken(resource.azureADAppId),
    () => Promise.reject()
  );
}

export function handleCallback(hash) {
  authContext.handleWindowCallback(hash);
}
