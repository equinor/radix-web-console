import AuthenticationContext from 'adal-angular';

import config, { getResource, getDummyAuthentication } from './api-config';

import { paramStringToObject } from '../utils/object';
import routes from '../routes';

/**
 * Auth context used for Azure AD authentication. Initialised when the
 * application loads using the configuration in `./api-config.js`
 *
 * 1) Does not work if user does not have authorisation for this app. See
 *    https://github.com/AzureAD/azure-activedirectory-library-for-js/issues/694#issuecomment-358049028
 */
const authContext = new AuthenticationContext({
  clientId: config.azureADAppId,
  tenant: config.azureADTenant,
  redirectUri: `${config.baseUrl}${routes.authCallback}`,
  postLogoutRedirectUri: `${config.baseUrl}${routes.authAfterLogout}`, // 1
});

/**
 * Request a token from Azure for accessing a specific resource
 * @param {string} resourceAzureADClientId Application ID of the resource
 */
function acquireToken(resourceAzureADClientId) {
  return new Promise((resolve, reject) => {
    authContext.acquireToken(resourceAzureADClientId, (error, token) => {
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

/**
 * Redirect browser to Azure authentication pages for login
 */
export function login() {
  if (!getDummyAuthentication()) {
    authContext.login();
  }
}

/**
 * Log out the user via redirect to Azure
 */
export function logout() {
  if (!getDummyAuthentication()) {
    authContext.logOut();
  }
}

/**
 * Get AD profile of current logged-in user
 */
export function getSignedInADProfile() {
  return authContext.getCachedUser();
}

/**
 * Get authentication status of current user
 */
export function isAuthenticated() {
  if (!authContext.getCachedUser()) return false;

  return !!authContext.getCachedToken(authContext.config.loginResource);
}

/**
 * Confirm the user is authenticated and get their token to access a resource
 * @param {string} resourceId Application ID of the resource
 */
export function authorize(resourceId) {
  if (getDummyAuthentication()) {
    return Promise.resolve('Dummy Auth Token');
  }
  const resource = getResource(resourceId);
  if (!resource) {
    return Promise.reject(`No resource with ID '${resourceId}'`);
  }
  return acquireToken(resource.azureADAppId);
}

export function clearAuth() {
  return authContext.clearCache();
}

/**
 * Callback for Adal.js; invoked after login
 * @param {Location} location Browser `location` object
 */
export function handleCallback(location) {
  const hashParams = paramStringToObject(location.hash.slice(1));

  if (hashParams.error) {
    return hashParams;
  }

  authContext.handleWindowCallback(location.hash);
}
