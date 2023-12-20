import { Icon } from '@equinor/eds-core-react';
import { check, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { BuildSecret } from '../../store/radix-api';

const BadgeTemplates: Record<
  BuildSecret['status'],
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  Pending: { icon: <Icon data={time} /> },
  Consistent: { icon: <Icon data={check} /> },
};

export const BuildSecretStatusBadge: FunctionComponent<{
  status: BuildSecret['status'];
}> = ({ status }) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

BuildSecretStatusBadge.propTypes = {
  status: PropTypes.string.isRequired as PropTypes.Validator<
    BuildSecret['status']
  >,
};
