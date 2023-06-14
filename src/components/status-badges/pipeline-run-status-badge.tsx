import { CircularProgress, Icon } from '@equinor/eds-core-react';
import { check, error_outlined, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { PipelineRunStatus } from '../../models/radix-api/jobs/pipeline-run-status';
import { PipelineTaskRunStatus } from '../../models/radix-api/jobs/pipeline-task-run-status';

const BadgeTemplates: Record<
  PipelineRunStatus | PipelineTaskRunStatus,
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  // shared
  Failed: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  Running: { icon: <CircularProgress /> },
  Started: { icon: <CircularProgress /> },
  Succeeded: { icon: <Icon data={check} /> },

  // PipelineTaskRun status
  [PipelineTaskRunStatus.Pending]: { icon: <Icon data={time} /> },
  [PipelineTaskRunStatus.TaskRunCancelled]: {},
  [PipelineTaskRunStatus.TaskRunImagePullFailed]: {},
  [PipelineTaskRunStatus.TaskRunTimeout]: {},

  // PipelineRun status
  [PipelineRunStatus.Completed]: { icon: <Icon data={check} /> },
  [PipelineRunStatus.Cancelled]: {},
  [PipelineRunStatus.CreateRunFailed]: {},
  [PipelineRunStatus.PipelineRunTimeout]: {},
};

export const PipelineRunStatusBadge = ({
  status,
}: {
  status: PipelineRunStatus | PipelineTaskRunStatus;
}): JSX.Element => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

PipelineRunStatusBadge.propTypes = {
  status: PropTypes.oneOf(
    Object.values({ ...PipelineRunStatus, ...PipelineTaskRunStatus })
  ).isRequired,
} as PropTypes.ValidationMap<{ status: PipelineRunStatus }>;
