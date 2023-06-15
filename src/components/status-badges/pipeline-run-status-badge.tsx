import { CircularProgress, Icon } from '@equinor/eds-core-react';
import { check, error_outlined, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { PipelineRunReason } from '../../models/radix-api/jobs/pipeline-run-reason';
import { PipelineTaskRunReason } from '../../models/radix-api/jobs/pipeline-task-run-reason';

const BadgeTemplates: Record<
  PipelineRunReason | PipelineTaskRunReason,
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  // shared
  Completed: { icon: <Icon data={check} /> },
  Failed: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  Running: { icon: <CircularProgress /> },
  Started: { icon: <CircularProgress /> },
  Succeeded: { icon: <Icon data={check} /> },

  // PipelineTaskRun status
  [PipelineTaskRunReason.AwaitingTaskRunResults]: {
    icon: <CircularProgress />,
  },
  [PipelineTaskRunReason.ResolvingTaskRef]: { icon: <Icon data={time} /> },
  [PipelineTaskRunReason.TaskRunCancelled]: {},
  [PipelineTaskRunReason.TaskRunImagePullFailed]: {},
  [PipelineTaskRunReason.TaskRunResultsVerificationFailed]: {},
  [PipelineTaskRunReason.TaskRunResultsVerified]: {},
  [PipelineTaskRunReason.TaskRunTimeout]: {},

  // PipelineRun status
  [PipelineRunReason.PipelineRunPending]: { icon: <Icon data={time} /> },
  [PipelineRunReason.PipelineRunStopping]: { icon: <CircularProgress /> },
  [PipelineRunReason.Cancelled]: {},
  [PipelineRunReason.CancelledRunningFinally]: {},
  [PipelineRunReason.PipelineRunTimeout]: {},
  [PipelineRunReason.StoppedRunningFinally]: {},
};

export const PipelineRunStatusBadge = ({
  status,
}: {
  status: PipelineRunReason | PipelineTaskRunReason;
}): JSX.Element => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

PipelineRunStatusBadge.propTypes = {
  status: PropTypes.oneOf(
    Object.values({ ...PipelineRunReason, ...PipelineTaskRunReason })
  ).isRequired,
} as PropTypes.ValidationMap<{ status: PipelineRunReason }>;
