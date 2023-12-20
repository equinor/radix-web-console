import { CircularProgress, Icon } from '@equinor/eds-core-react';
import { error_outlined, run, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  StatusTooltipTemplate,
  StatusTooltipTemplateProps,
} from './status-tooltip-template';

import { ReplicaStatus as OldReplicaStatus } from '../../models/radix-api/deployments/replica-status';
import { ReplicaSummary } from '../../store/radix-api';

type ReplicaStatus = ReplicaSummary['replicaStatus']['status'];

const TooltipTemplates: Record<
  OldReplicaStatus | ReplicaStatus,
  Pick<StatusTooltipTemplateProps, 'icon' | 'type'>
> = {
  Pending: { icon: <Icon data={time} /> },
  Failing: { type: 'danger', icon: <Icon data={error_outlined} /> },
  Running: { icon: <Icon data={run} /> },
  Terminated: undefined,
  Starting: { icon: <CircularProgress /> },

  // deprecated
  Unsupported: undefined,
};

export const ReplicaStatusTooltip: FunctionComponent<{
  status: OldReplicaStatus | ReplicaStatus;
}> = ({ status }) => (
  <StatusTooltipTemplate title={status} {...TooltipTemplates[status]} />
);

ReplicaStatusTooltip.propTypes = {
  status: PropTypes.string.isRequired as PropTypes.Validator<ReplicaStatus>,
};
