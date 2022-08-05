import { Button } from '@equinor/eds-core-react';
import { Authentication } from './authentication';

export const SignIn = () => {
  const auth = Authentication();

  return (
    <>
      <p>User is not logged in</p>
      <Button onClick={auth.signIn}>sign in</Button>
    </>
  );
};
