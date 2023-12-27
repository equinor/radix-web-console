import { Icon } from '@equinor/eds-core-react';
import { check, error_outlined, stop, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { SecretStatus as OldSecretStatus } from '../../models/radix-api/secrets/secret-status';
import { Secret } from '../../store/radix-api';

type SecretStatus = Secret['status'] | OldSecretStatus;

const BadgeTemplates: Record<
  SecretStatus,
  Pick<StatusBadgeTemplateProps, 'children' | 'icon' | 'type'>
> = {
  Pending: { type: 'warning', icon: <Icon data={time} /> },
  Consistent: { icon: <Icon data={check} /> },
  NotAvailable: {
    type: 'danger',
    icon: <Icon data={stop} />,
    children: 'Not available',
  },
  Invalid: { type: 'danger', icon: <Icon data={error_outlined} /> },

  // deprecated
  [OldSecretStatus.Unsupported]: {
    type: 'warning',
    icon: <Icon data={error_outlined} />,
  },
};

export const ComponentSecretStatusBadge: FunctionComponent<{
  status: SecretStatus;
}> = ({ status }) => {
  const { children, ...rest } = BadgeTemplates[status];
  return (
    <StatusBadgeTemplate {...rest}>{children ?? status}</StatusBadgeTemplate>
  );
};

ComponentSecretStatusBadge.propTypes = {
  status: PropTypes.string.isRequired as PropTypes.Validator<SecretStatus>,
};
