import { config, msalConfig } from './Config';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { getUser } from './graphService';
import { useCallback, useEffect, useState } from 'react';

export interface AppUser {
  displayName?: string;
  email?: string;
}

const pca = new PublicClientApplication(msalConfig);

const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(pca, {
  account: pca.getActiveAccount(),
  scopes: config.scopes,
  interactionType: InteractionType.Popup,
});

export const useAuthentication = () => {
  const [auth, setAuth] = useState<{
    authProvider: AuthCodeMSALBrowserAuthenticationProvider;
    user: AppUser;
  }>({ authProvider: undefined, user: undefined });
  const msal = useMsal();

  const checkUser = useCallback(async () => {
    try {
      const account = msal.instance.getActiveAccount();
      if (account) {
        const user = await getUser(authProvider);
        setAuth({
          authProvider: authProvider,
          user: {
            displayName: user.displayName || '',
            email: user.mail || '',
          },
        });
      }
    } catch (err: any) {
      console.log(err);
    }
  }, [msal?.instance]);

  useEffect(() => {
    if (!auth?.user) {
      checkUser();
    }
  }, [auth?.user, checkUser]);

  return auth;
};
