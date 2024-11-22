import { Typography } from '@equinor/eds-core-react';
import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

type Props = { appName: string };

export const NewApplyConfigPipelineLink = ({
  appName,
  children,
}: PropsWithChildren<Props>) => (
  <Typography
    as={Link}
    to={routeWithParams(
      routes.appJobNew,
      {
        appName: appName,
      },
      { pipeline: 'apply-config' }
    )}
    link
  >
    {children}
  </Typography>
);
