const defaultResourceId = 'radix_dev_playground';

const config = {
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
   * TODO: Switch between localhost and env URL
   */
  baseUrl: 'http://localhost:3000',

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
  resources: {
    radix_dev_playground: {
      azureADAppId: '10dfbb3a-d180-4da4-a74b-94a29333b43c',
      baseUri:
        'playground-playground-k8s-f-16ede4-9b2d733a.hcp.northeurope.azmk8s.io:443/apis/radix.equinor.com/v1/',
    },
  },
};

export default config;

export const getResource = (resourceId = defaultResourceId) =>
  config.resources[resourceId];
