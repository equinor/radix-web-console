import { Icon } from '@equinor/eds-core-react';
import { check, stop } from '@equinor/eds-icons';

import { StatusBadgeTemplate } from './status-badge-template';
import { RelativeToNow } from '../time/relative-to-now';

type Props = {
  updated?: string;
};

export const SecretUpdatedBadge = ({ updated }: Props) => (
  <StatusBadgeTemplate
    icon={updated ? <Icon data={check} /> : <Icon data={stop} />}
  >
    {updated ? <RelativeToNow time={updated} /> : 'Unknown'}
  </StatusBadgeTemplate>
);
