import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check,
  error_outlined,
  stop,
  time,
  traffic_light,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { RadixJobCondition } from '../../models/radix-api/jobs/radix-job-condition';

const BadgeTemplates: Record<
  RadixJobCondition,
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  [RadixJobCondition.Waiting]: { icon: <Icon data={traffic_light} /> },
  [RadixJobCondition.Queued]: { icon: <Icon data={time} /> },
  [RadixJobCondition.Running]: { icon: <CircularProgress /> },
  [RadixJobCondition.Succeeded]: { icon: <Icon data={check} /> },
  [RadixJobCondition.Stopping]: { icon: <CircularProgress /> },
  [RadixJobCondition.Stopped]: { icon: <Icon data={stop} /> },
  [RadixJobCondition.StoppedNoChanges]: { icon: <Icon data={stop} /> },
  [RadixJobCondition.Failed]: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
};

export const RadixJobConditionBadge = ({
  status,
}: {
  status: RadixJobCondition;
}): React.JSX.Element => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

RadixJobConditionBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(RadixJobCondition)).isRequired,
} as PropTypes.ValidationMap<{ status: RadixJobCondition }>;
