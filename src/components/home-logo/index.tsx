import { Typography } from '@equinor/eds-core-react'
import type { FunctionComponent } from 'react'

import { Link } from 'react-router-dom'
import { routes } from '../../routes'
import { HomeIcon } from '../home-icon'

export const HomeLogo: FunctionComponent = () => (
  <Typography
    link
    as={Link}
    to={routes.home}
    token={{
      color: 'var(--eds_text_static_icons__default)',
      textDecoration: 'none',
    }}
  >
    <HomeIcon /> Omnia Radix
  </Typography>
)
