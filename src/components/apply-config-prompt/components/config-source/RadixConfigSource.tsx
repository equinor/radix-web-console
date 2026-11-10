import { Typography } from '@equinor/eds-core-react'
import type { ApplicationRegistration } from '../../../../store/radix-api'
import { linkToGitHubBranch } from '../../../../utils/string'
import { ExternalLink } from '../../../link/external-link'
import { RadixConfigFileLink } from '../../../link/radix-config-file-link'
import { getRepositoryDisplayName } from '../panel/applyConfigPromptPanel.utils'
import styles from './radixConfigSource.module.css'

interface RadixConfigSourceProps {
  readonly registration: Pick<ApplicationRegistration, 'repository' | 'configBranch' | 'radixConfigFullName'>
}

/** Where Radix will read the config from: repository, branch and file, each linked to GitHub. */
export const RadixConfigSource = (props: RadixConfigSourceProps) => {
  const { registration } = props

  return (
    <dl className={styles.details}>
      <div className={styles.detail}>
        <Typography variant="meta" as="dt" className={styles.label}>
          Repository
        </Typography>
        <Typography as="dd">
          <ExternalLink href={registration.repository}>
            {getRepositoryDisplayName(registration.repository)}
          </ExternalLink>
        </Typography>
      </div>

      <div className={styles.detail}>
        <Typography variant="meta" as="dt" className={styles.label}>
          Config branch
        </Typography>
        <Typography as="dd">
          <ExternalLink href={linkToGitHubBranch(registration.repository, registration.configBranch)}>
            {registration.configBranch}
          </ExternalLink>
        </Typography>
      </div>

      <div className={styles.detail}>
        <Typography variant="meta" as="dt" className={styles.label}>
          Config file
        </Typography>
        <Typography as="dd">
          <RadixConfigFileLink registration={registration} />
        </Typography>
      </div>
    </dl>
  )
}
