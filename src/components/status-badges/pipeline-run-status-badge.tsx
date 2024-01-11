import { CircularProgress, Icon } from '@equinor/eds-core-react';
import { check, error_outlined, run, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import { StatusBadgeTemplate } from './status-badge-template';
import { PipelineRunReason } from '../../models/radix-api/jobs/pipeline-run-reason';
import { PipelineTaskRunReason } from '../../models/radix-api/jobs/pipeline-task-run-reason';

const BadgeTemplates = {
  // shared
  Completed: { icon: <Icon data={check} /> },
  Failed: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  Running: { icon: <Icon data={run} /> },
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
} as const;

type Props = {
  status: PipelineRunReason | PipelineTaskRunReason;
};

export function PipelineRunStatusBadge({ status }: Props) {
  return (
    <StatusBadgeTemplate {...BadgeTemplates[status]}>
      {status}
    </StatusBadgeTemplate>
  );
}

PipelineRunStatusBadge.propTypes = {
  status: PropTypes.oneOf(
    Object.values({ ...PipelineRunReason, ...PipelineTaskRunReason })
  ).isRequired,
};
