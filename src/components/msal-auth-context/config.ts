import { configVariables } from '../../utils/config';
import { Configuration } from '@azure/msal-browser';

export const msGraphConfig = {
  scopes: ['User.Read', 'GroupMember.Read.All'],
};

export const serviceNowApiConfig = {
  scopes: configVariables.SERVICENOW_PROXY_SCOPES,
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
