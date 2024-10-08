import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check_circle_outlined,
  error_outlined,
  run,
  stop,
  time,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';

import {
  StatusTooltipTemplate,
  type StatusTooltipTemplateProps,
} from './status-tooltip-template';

import type { ReplicaSummary } from '../../store/radix-api';

type ReplicaStatus = ReplicaSummary['replicaStatus']['status'];

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
  Terminated: undefined,
  Starting: { title: 'Starting', icon: <CircularProgress /> },
} satisfies Record<ReplicaStatus, StatusTooltipTemplateProps>;

export const ReplicaStatusTooltip: FunctionComponent<{
  status: ReplicaStatus;
}> = ({ status }) => (
  <StatusTooltipTemplate title={status} {...TooltipTemplates[status]} />
);

ReplicaStatusTooltip.propTypes = {
  status: PropTypes.string.isRequired as PropTypes.Validator<ReplicaStatus>,
};
