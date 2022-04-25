import { Typography } from '@equinor/eds-core-react';

import { HomeIcon } from '../home-icon';
import { routes } from '../../routes';

export const HomeLogo = (): JSX.Element => (
  <Typography
    link
    href={routes.home}
    token={{
      color: 'var(--eds_text_static_icons__default)',
      textDecoration: 'none',
    }}
  >
    <HomeIcon /> Omnia Radix
  </Typography>
);
