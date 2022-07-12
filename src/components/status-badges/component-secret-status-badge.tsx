import { Icon } from '@equinor/eds-core-react';
import { check, info_circle, stop, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { SecretStatus } from '../../models/secret-status';

const BadgeTemplates: {
  [key: string]: StatusBadgeTemplateProps & { statusTitle?: string };
} = {
  [SecretStatus.Pending]: { icon: <Icon data={time} /> },
  [SecretStatus.NotAvailable]: {
    icon: <Icon data={stop} />,
    statusTitle: 'Not available',
  },
  [SecretStatus.Orphan]: {
    type: 'warning',
    icon: <Icon data={info_circle} />,
  },
  [SecretStatus.Consistent]: { icon: <Icon data={check} /> },
};

export const ComponentSecretStatusBadge = ({
  status,
}: {
  status: SecretStatus;
}): JSX.Element => {
  const { statusTitle, ...rest } = BadgeTemplates[status];
  return (
    <StatusBadgeTemplate {...rest}>{statusTitle ?? status}</StatusBadgeTemplate>
  );
};

ComponentSecretStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(SecretStatus)).isRequired,
} as PropTypes.ValidationMap<{ status: SecretStatus }>;
