import { Icon } from '@equinor/eds-core-react'
import { check, stop } from '@equinor/eds-icons'

import { RelativeToNow } from '../time/relative-to-now'
import { StatusBadgeTemplate } from './status-badge-template'

type Props = {
  updated?: string
}

export const SecretUpdatedBadge = ({ updated }: Props) => (
  <StatusBadgeTemplate icon={updated ? <Icon data={check} /> : <Icon data={stop} />}>
    {updated ? <RelativeToNow time={updated} /> : 'Unknown'}
  </StatusBadgeTemplate>
)
