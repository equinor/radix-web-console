import { config } from './Config';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from '@azure/msal-react';
import { getUser } from './GraphService';
import { useEffect, useState } from 'react';

export interface AppUser {
  displayName?: string;
  email?: string;
}

export const UserContext = () => {
  const [user, setUser] = useState<AppUser>(undefined);

  const msal = useMsal();

  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msal.instance as PublicClientApplication,
    {
      account: msal.instance.getActiveAccount()!,
      scopes: config.scopes,
      interactionType: InteractionType.Popup,
    }
  );

  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        try {
          const account = msal.instance.getActiveAccount();
          if (account) {
            const user = await getUser(authProvider);
            setUser({
              displayName: user.displayName || '',
              email: user.mail || '',
            });
          }
        } catch (err: any) {
          console.log(err);
        }
      }
    };
    checkUser();
  });

  const signIn = async () => {
    await msal.instance.loginPopup({
      scopes: config.scopes,
      prompt: 'select_account',
    });

    const user = await getUser(authProvider);

    setUser({
      displayName: user.displayName || '',
      email: user.mail || '',
    });
  };

  const signOut = async () => {
    await msal.instance.logoutPopup();
    setUser(undefined);
  };

  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      {isAuthenticated ? <p>User Signed in</p> : <p>No logged in user</p>}
      <AuthenticatedTemplate>
        <p>User is logged in</p>
        <button onClick={signOut}>sign out</button>
        <p>Welcome {user?.displayName || ''} </p>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>User is not logged in</p>
        <button onClick={signIn}>sign in</button>
        <p>Welcome {user?.displayName || ''} </p>
      </UnauthenticatedTemplate>
    </>
  );
};
