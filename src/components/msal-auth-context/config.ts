import type { Configuration } from '@azure/msal-browser';
import { configVariables } from '../../utils/config';

export const msGraphConfig = {
  scopes: ['User.Read', 'GroupMember.Read.All', 'Application.Read.All'],
};

export const serviceNowApiConfig = {
  scopes: configVariables.SERVICENOW_PROXY_SCOPES.split(','),
};

export const msalConfig: Configuration = {
  auth: {
    clientId: configVariables.OAUTH2_CLIENT_ID,
    authority: configVariables.OAUTH2_AUTHORITY,
    redirectUri: `${window.location.origin}/applications`,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};
