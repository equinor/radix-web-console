import { Icon } from '@equinor/eds-core-react';
import { check, error_outlined, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { Tls } from '../../store/radix-api';

type Status = Tls['status'];

const BadgeTemplates: Record<
  Status,
  Readonly<Pick<StatusBadgeTemplateProps, 'icon' | 'type'>>
> = {
  Pending: { type: 'warning', icon: <Icon data={time} /> },
  Consistent: { icon: <Icon data={check} /> },
  Invalid: { type: 'danger', icon: <Icon data={error_outlined} /> },
};

export const ExternalDNSStatusBadge: FunctionComponent<{
  status: Status;
}> = ({ status }) => {
  const { type, icon } = BadgeTemplates[status];

  return (
    <StatusBadgeTemplate type={type} icon={icon}>
      {status}
    </StatusBadgeTemplate>
  );
};

ExternalDNSStatusBadge.propTypes = {
  status: PropTypes.string.isRequired as PropTypes.Validator<Status>,
};
