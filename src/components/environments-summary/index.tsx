import { Typography } from '@equinor/eds-core-react'
import * as PropTypes from 'prop-types'
import type { FunctionComponent } from 'react'

import { EnvironmentCard } from './environment-card'

import { externalUrls } from '../../externalUrls'
import type { EnvironmentSummary } from '../../store/radix-api'

import './style.css'

export interface EnvironmentsSummaryProps {
  appName: string
  envs?: Readonly<Array<EnvironmentSummary>>
  repository?: string
}

export const EnvironmentsSummary: FunctionComponent<
  EnvironmentsSummaryProps
> = ({ appName, envs, repository }) => (
  <div className="environments-summary">
    {envs?.length > 0 ? (
      envs.map((env, i) => (
        <EnvironmentCard key={i} {...{ appName, env, repository }} />
      ))
    ) : (
      <Typography>
        <strong>No environments.</strong> Please run a pipeline job to deploy
        one or define at least one environment in{' '}
        <Typography
          link
          href={externalUrls.referenceRadixConfig}
          rel="noopener noreferrer"
          target="_blank"
        >
          radixconfig.yaml
        </Typography>
      </Typography>
    )}
  </div>
)

EnvironmentsSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<EnvironmentSummary>
  ),
  repository: PropTypes.string,
}
