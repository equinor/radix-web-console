import { Typography } from '@equinor/eds-core-react'
import { Link } from 'react-router'
import { ExternalLink } from '../../link/external-link'
import type { EnvironmentCardBuildSource } from '../environmentCard.types'

export const BuildSourceLabel = (props: Pick<EnvironmentCardBuildSource, 'url' | 'label'>) => {
  const { url, label } = props

  if (!url) {
    return (
      <Typography as="span" color="disabled">
        {label}
      </Typography>
    )
  }

  if (url.showAsExternalUrl) {
    return <ExternalLink href={url.path}>{label}</ExternalLink>
  }

  return (
    <Typography as={Link} to={url.path} link>
      {label}
    </Typography>
  )
}
