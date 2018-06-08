const defaultResourceId = 'radix';

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
    radix: {
      azureADAppId: '3e5a4856-ef47-4cb3-a25e-89719cbe69f0',
      baseUrl: 'https://api.statoil.com/app/someawesomeapi/dev/api',
    },
  },
};

export default config;

export const getResource = (resourceId = defaultResourceId) =>
  config.resources[resourceId];
