import { config, msalConfig } from './Config';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useCallback, useEffect, useState } from 'react';

const msalInstance = new PublicClientApplication(msalConfig);

const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
  msalInstance,
  {
    account: msalInstance.getActiveAccount(),
    scopes: config.scopes,
    interactionType: InteractionType.Popup,
  }
);

export const useAuthentication = () => {
  const [auth, setAuth] = useState<{
    authProvider: AuthCodeMSALBrowserAuthenticationProvider;
  }>({ authProvider: undefined });

  const setAuthentication = useCallback(async () => {
    if (msalInstance.getActiveAccount()) {
      setAuth({
        authProvider: authProvider,
      });
    }
  }, []);

  useEffect(() => {
    setAuthentication();
  }, [setAuthentication]);

  return auth;
};
