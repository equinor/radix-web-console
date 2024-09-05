import { Icon, Typography } from '@equinor/eds-core-react'
import { github } from '@equinor/eds-icons'
import type { FunctionComponent } from 'react'

import { smallGithubCommitHash } from '../../utils/string'

export interface CommitHashProps {
  commit: string
  repo?: string
}

export const CommitHash: FunctionComponent<CommitHashProps> = ({
  commit,
  repo,
}) =>
  commit?.length > 0 ? (
    <Typography
      link={!!repo}
      {...(repo
        ? {
            title: 'Open commit in repository',
            href: `${repo}/commit/${commit}`,
            token: { textDecoration: 'none' },
          }
        : { as: 'span', token: { color: 'currentColor' } })}
    >
      {smallGithubCommitHash(commit)} {repo && <Icon data={github} size={18} />}
    </Typography>
  ) : null
