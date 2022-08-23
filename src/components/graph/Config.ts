import { Configuration } from '@azure/msal-browser';
import { AuthCodeMSALBrowserAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { configVariables } from '../../utils/config';

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
export const config: Pick<
  AuthCodeMSALBrowserAuthenticationProviderOptions,
  'scopes'
> = {
  scopes: ['User.Read', 'GroupMember.Read.All'],
};
