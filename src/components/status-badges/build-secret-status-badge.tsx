import { Icon } from '@equinor/eds-core-react';
import { check, error_outlined, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { BuildSecretStatus } from '../../models/radix-api/buildsecrets/build-secret-status';

const BadgeTemplates: Record<
  BuildSecretStatus,
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  [BuildSecretStatus.Pending]: { icon: <Icon data={time} /> },
  [BuildSecretStatus.Consistent]: { icon: <Icon data={check} /> },
  [BuildSecretStatus.Unsupported]: { icon: <Icon data={error_outlined} /> },
};

export const BuildSecretStatusBadge = ({
  status,
}: {
  status: BuildSecretStatus;
}): React.JSX.Element => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

BuildSecretStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(BuildSecretStatus)).isRequired,
} as PropTypes.ValidationMap<{ status: BuildSecretStatus }>;
