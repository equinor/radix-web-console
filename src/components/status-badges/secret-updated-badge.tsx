import { Icon } from '@equinor/eds-core-react';
import { check, stop } from '@equinor/eds-icons';

import { formatDateTime } from '../../utils/datetime';
import { StatusBadgeTemplate } from './status-badge-template';

type Props = {
  updated?: string;
};

export const SecretUpdatedBadge = ({ updated }: Props) => (
  <StatusBadgeTemplate
    icon={updated ? <Icon data={check} /> : <Icon data={stop} />}
  >
    {updated ? formatDateTime(updated) : 'Unknown'}
  </StatusBadgeTemplate>
);
