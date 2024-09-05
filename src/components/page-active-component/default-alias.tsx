import { Icon, Typography } from '@equinor/eds-core-react'
import { external_link } from '@equinor/eds-icons'
import * as PropTypes from 'prop-types'
import type { ApplicationAlias } from '../../store/radix-api'

export interface Props {
  appAlias?: ApplicationAlias
  envName: string
  componentName: string
}

export function DefaultAlias({ appAlias, envName, componentName }: Props) {
  return (
    <>
      {appAlias &&
        appAlias.componentName === componentName &&
        appAlias.environmentName === envName && (
          <Typography>
            This component is the{' '}
            <Typography
              link
              href={`https://${appAlias.url}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              default alias <Icon data={external_link} size={16} />
            </Typography>
          </Typography>
        )}
    </>
  )
}

DefaultAlias.propTypes = {
  appAlias: PropTypes.object as PropTypes.Validator<ApplicationAlias>,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
}
