import { useIsAuthenticated } from '@azure/msal-react';
import { Button, Tooltip, Typography } from '@equinor/eds-core-react';
import { Authentication } from './authentication';
import { ADGroups } from './adGroups';

export interface AppUser {
  displayName?: string;
  email?: string;
}

export const UserContext = () => {
  const auth = Authentication();

  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <Typography
        className="label"
        group="input"
        variant="text"
        token={{ color: 'currentColor' }}
      >
        Custom{' '}
        <Tooltip title="Active Directory" placement="top">
          <span>AD</span>
        </Tooltip>{' '}
        groups (comma-separated){' '}
        {isAuthenticated ? (
          <span>(Logged in as {auth.user?.displayName || ''})</span>
        ) : (
          <span>(Logget out)</span>
        )}
      </Typography>
      <ADGroups />
      <Button onClick={auth.signOut}>sign out</Button>
    </>
  );
};
