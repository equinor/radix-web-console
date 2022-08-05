import { useIsAuthenticated } from '@azure/msal-react';
import { Button } from '@equinor/eds-core-react';
import { Authentication } from './authentication';

export interface AppUser {
  displayName?: string;
  email?: string;
}

export const UserContext = () => {
  const auth = Authentication();

  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      {isAuthenticated ? <p>Signed in</p> : <p>No logged in user</p>}
      <p>Welcome {auth.user?.displayName || ''}</p>
      <Button onClick={auth.signOut}>sign out</Button>
    </>
  );
};
