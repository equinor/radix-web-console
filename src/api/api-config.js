import configHandler from '../utils/config';
import { keys } from '../utils/config/keys';

const defaultResourceId = 'radix_dev_playground_radix';

const domain = configHandler.getDomain();
const apiEnvironment = configHandler.getConfig(keys.RADIX_API_ENVIRONMENT);

const config = Object.freeze({
  /**
   * Azure AD Application ID of this app
   */
  azureADAppId: 'a593a59c-8f76-490e-937b-a90779039a90',

  /**
   * Azure AD Tenant
   */
  azureADTenant: 'statoilsrm.onmicrosoft.com',

  /**
   * Base URL of the application
   */
  baseUrl: window.location.origin,

  /**
   * Remote resources to try and access; authorisation will be requested of
   * Azure AD as needed.
   *
   * Format:
   *
   * @example
   * resourceName: {
   *   azureADAppId: 'Azure AD Application ID of remote app',
   *   baseUrl: '/base/path/to/resource/',
   * }
   */
  resources: Object.freeze({
    radix_dev_playground_radix: Object.freeze({
      azureADAppId: '10dfbb3a-d180-4da4-a74b-94a29333b43c',
      baseUri: `api.${domain}/apis/radix.equinor.com/v1/`,
    }),
    radix_dev_playground_k8s: Object.freeze({
      azureADAppId: '10dfbb3a-d180-4da4-a74b-94a29333b43c',
      baseUri: `api.${domain}/api/v1/`,
    }),
    radix_dev_playground_batch: Object.freeze({
      azureADAppId: '10dfbb3a-d180-4da4-a74b-94a29333b43c',
      baseUri: `api.${domain}/apis/batch/v1/`,
    }),
    radix_api: Object.freeze({
      azureADAppId: '10dfbb3a-d180-4da4-a74b-94a29333b43c',
      baseUri: `server-radix-api-${apiEnvironment}.${domain}/api/v1/`,
    }),
  }),
});

export default config;

export const getResource = (resourceId = defaultResourceId) =>
  config.resources[resourceId];

let dummyAuthentication = false;

export const setDummyAuthentication = state => (dummyAuthentication = !!state);
export const getDummyAuthentication = () => dummyAuthentication;
