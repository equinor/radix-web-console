import { Icon } from '@equinor/eds-core-react';
import { check, error_outlined, stop, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { SecretStatus } from '../../models/secret-status';

export interface ComponentSecretStatusBadgeProps {
  status: SecretStatus;
}

const BadgeTemplates: Record<
  SecretStatus,
  StatusBadgeTemplateProps & { statusTitle?: string }
> = {
  [SecretStatus.Pending]: { type: 'warning', icon: <Icon data={time} /> },
  [SecretStatus.NotAvailable]: {
    type: 'danger',
    icon: <Icon data={stop} />,
    statusTitle: 'Not available',
  },
  [SecretStatus.Invalid]: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  [SecretStatus.Consistent]: { icon: <Icon data={check} /> },
  [SecretStatus.Unsupported]: {
    type: 'warning',
    icon: <Icon data={error_outlined} />,
  },
};

export const ComponentSecretStatusBadge = ({
  status,
}: ComponentSecretStatusBadgeProps): JSX.Element => {
  const { statusTitle, ...rest } = BadgeTemplates[status];
  return (
    <StatusBadgeTemplate {...rest}>{statusTitle ?? status}</StatusBadgeTemplate>
  );
};

ComponentSecretStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(SecretStatus)).isRequired,
} as PropTypes.ValidationMap<ComponentSecretStatusBadgeProps>;
