import { Icon } from '@equinor/eds-core-react';
import { check, time, error_outlined } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { BuildSecretStatus } from '../../models/build-secret-status';

const BadgeTemplates: {
  [key: string]: StatusBadgeTemplateProps;
} = {
  [BuildSecretStatus.Pending]: { icon: <Icon data={time} /> },
  [BuildSecretStatus.Consistent]: { icon: <Icon data={check} /> },
  [BuildSecretStatus.Unsupported]: { icon: <Icon data={error_outlined} /> },
};

export const BuildSecretStatusBadge = ({
  status,
}: {
  status: BuildSecretStatus;
}): JSX.Element => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

BuildSecretStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(BuildSecretStatus)).isRequired,
} as PropTypes.ValidationMap<{ status: BuildSecretStatus }>;
