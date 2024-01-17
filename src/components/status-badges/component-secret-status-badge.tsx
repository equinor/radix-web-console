import { Icon } from '@equinor/eds-core-react';
import { check, error_outlined, stop, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { Secret } from '../../store/radix-api';

type SecretStatus = Secret['status'];

let Unsupported = {
  type: 'warning',
  icon: <Icon data={error_outlined} />,
};
const BadgeTemplates = {
  Pending: { type: 'warning', icon: <Icon data={time} /> },
  Consistent: { icon: <Icon data={check} /> },
  NotAvailable: {
    type: 'danger',
    icon: <Icon data={stop} />,
    children: 'Not available',
  },
} satisfies Record<SecretStatus, StatusBadgeTemplateProps>;

export const ComponentSecretStatusBadge: FunctionComponent<{
  status: SecretStatus;
}> = ({ status }) => {
  const props = BadgeTemplates[status] ?? Unsupported;
  return <StatusBadgeTemplate {...props}>{status}</StatusBadgeTemplate>;
};

ComponentSecretStatusBadge.propTypes = {
  status: PropTypes.string.isRequired as PropTypes.Validator<SecretStatus>,
};
