import { Icon } from '@equinor/eds-core-react';
import { check, error_outlined, stop, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { SecretStatus } from '../../models/radix-api/secrets/secret-status';

export interface ComponentSecretStatusBadgeProps {
  status: SecretStatus;
}

const BadgeTemplates: Record<
  SecretStatus,
  Pick<StatusBadgeTemplateProps, 'children' | 'icon' | 'type'>
> = {
  [SecretStatus.Pending]: { type: 'warning', icon: <Icon data={time} /> },
  [SecretStatus.NotAvailable]: {
    type: 'danger',
    icon: <Icon data={stop} />,
    children: 'Not available',
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
  const { children, ...rest } = BadgeTemplates[status];
  return (
    <StatusBadgeTemplate {...rest}>{children ?? status}</StatusBadgeTemplate>
  );
};

ComponentSecretStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(SecretStatus)).isRequired,
} as PropTypes.ValidationMap<ComponentSecretStatusBadgeProps>;
