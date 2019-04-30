import configHandler from '../utils/config';
import { keys as configKeys } from '../utils/config/keys';

const defaultResourceId = 'radix_dev_playground_radix';

const domain = configHandler.getDomain();
const apiEnv = configHandler.getConfig(configKeys.RADIX_API_ENVIRONMENT);
const clusterType = configHandler.getConfig(configKeys.RADIX_CLUSTER_TYPE);

const config = Object.freeze({
  /**
   * Azure AD application ID of this app. This varies depending on the cluster
   * type, so that the application has different authorisation requirements
   * (i.e. permitted groups) for a playground cluster than for production or
   * development
   */
  azureADAppId: {
    development: '5687b237-eda3-4ec3-a2a1-023e85a2bd84',
    playground: 'fc082d3c-f792-4190-99f6-b63c1b270ea9',
    production: 'a593a59c-8f76-490e-937b-a90779039a90',
  }[clusterType],

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
    radix_api: Object.freeze({
      /**
       * Azure AD application ID of Radix API. Different cluster types have
       * different app IDs to enforce authorisation, so we pick the correct
       * ID for the app that represents the type of cluster.
       */
      azureADAppId: {
        development: '1025aa65-09e1-41a8-8c59-68ede2e41340',
        playground: '1025aa65-09e1-41a8-8c59-68ede2e41340', // NB: same as development for now
        production: '58f71060-187f-4f7b-b0de-da2e245a2ec1',
      }[clusterType],
      baseUri: `server-radix-api-${apiEnv}.${domain}/api/v1`,
    }),
  }),
});

export default config;

export const getResource = (resourceId = defaultResourceId) =>
  config.resources[resourceId];

let dummyAuthentication = false;

export const setDummyAuthentication = state => (dummyAuthentication = !!state);
export const getDummyAuthentication = () => dummyAuthentication;
