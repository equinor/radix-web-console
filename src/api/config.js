const defaultResourceId = 'radix';

export default {
  azureADAppId: 'a593a59c-8f76-490e-937b-a90779039a90',
  azureADTenant: 'statoilsrm.onmicrosoft.com',

  resources: {
    radix: {
      azureADAppId: '3e5a4856-ef47-4cb3-a25e-89719cbe69f0',
      baseUrl: 'https://api.statoil.com/app/someawesomeapi/dev/api'
    }
  }
};

export const getResource = (resourceId = defaultResourceId)
  => config.resources[resourceId];
