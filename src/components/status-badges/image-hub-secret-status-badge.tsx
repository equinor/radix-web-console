import { Icon } from '@equinor/eds-core-react';
import { check, error_outlined, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { ImageHubSecretStatus } from '../../models/image-hub-secret-status';

const BadgeTemplates: Record<
  ImageHubSecretStatus,
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  [ImageHubSecretStatus.Pending]: { icon: <Icon data={time} /> },
  [ImageHubSecretStatus.Consistent]: { icon: <Icon data={check} /> },
  [ImageHubSecretStatus.Unsupported]: { icon: <Icon data={error_outlined} /> },
};

export const ImageHubSecretStatusBadge = ({
  status,
}: {
  status: ImageHubSecretStatus;
}): JSX.Element => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

ImageHubSecretStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(ImageHubSecretStatus)).isRequired,
} as PropTypes.ValidationMap<{ status: ImageHubSecretStatus }>;
