import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check_circle_outlined,
  error_outlined,
  run,
  stop,
  time,
} from '@equinor/eds-icons';

import {
  StatusTooltipTemplate,
  type StatusTooltipTemplateProps,
} from './status-tooltip-template';

import type { ReplicaStatus } from '../../store/radix-api';

const TooltipTemplates = {
  Pending: { title: 'Pending', icon: <Icon data={time} /> },
  Failed: {
    title: 'Failed',
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  Failing: {
    title: 'Failing',
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  Running: { title: 'Running', icon: <Icon data={run} /> },
  Succeeded: {
    title: 'Succeeded',
    icon: <Icon data={check_circle_outlined} />,
  },
  Stopped: { title: 'Stopped', icon: <Icon data={stop} /> },
  Terminated: { title: 'Terminated', icon: <Icon data={stop} /> },
  Starting: { title: 'Starting', icon: <CircularProgress /> },
} satisfies Record<ReplicaStatus['status'], StatusTooltipTemplateProps>;

type Props = { status: ReplicaStatus['status'] };
export const ReplicaStatusTooltip = ({ status }: Props) => (
  <StatusTooltipTemplate {...TooltipTemplates[status]} />
);
