import { Button, Typography } from '@equinor/eds-core-react';
import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

type Props = { appName: string; button?: boolean };

export const NewApplyConfigPipelineLink = ({
  button,
  appName,
  children,
}: PropsWithChildren<Props>) => {
  const to = routeWithParams(
    routes.appJobNew,
    { appName: appName },
    { pipeline: 'apply-config' }
  );

  if (button) {
    return (
      <Button as={Link} to={to}>
        {children}
      </Button>
    );
  }

  return (
    <Typography as={Link} to={to} link>
      {children}
    </Typography>
  );
};
