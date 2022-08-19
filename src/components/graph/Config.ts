import { Configuration } from '@azure/msal-browser';
import { AuthCodeMSALBrowserAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '5687b237-eda3-4ec3-a2a1-023e85a2bd84',
    authority:
      'https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0',
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
