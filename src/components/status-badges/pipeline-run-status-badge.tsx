import { CircularProgress, Icon } from '@equinor/eds-core-react';
import { blocked, check, error_outlined, run, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import { StatusBadgeTemplate } from './status-badge-template';
import { PipelineRunTaskStep, PipelineRunTask } from '../../store/radix-api';
import { ComponentProps } from 'react';

type BadgeProps = ComponentProps<typeof StatusBadgeTemplate>;

type TaskRunReason = PipelineRunTaskStep['status'];
type PipelineRunReason = PipelineRunTask['status'];
type Status = TaskRunReason | PipelineRunReason;

const FailedIcon = {
  type: 'danger',
  icon: <Icon data={error_outlined} />,
} as const;

const LoadingIcon = { icon: <CircularProgress /> } as const;
const WaitingIcon = { icon: <Icon data={time} /> } as const;
const RunIcon = { icon: <Icon data={run} /> } as const;
const CheckIcon = { icon: <Icon data={check} /> } as const;
const CancelledIcon = { icon: <Icon data={blocked} /> } as const;

const BadgeTemplates = {
  // shared
  Failed: FailedIcon,
  Running: RunIcon,
  Started: LoadingIcon,
  Succeeded: CheckIcon,
  ResourceVerificationFailed: FailedIcon,
  InvalidParamValue: FailedIcon,

  // PipelineRunTask status
  Completed: CheckIcon,
  ToBeRetried: WaitingIcon,
  TaskRunCancelled: CancelledIcon,
  TaskRunTimeout: CancelledIcon,
  TaskRunImagePullFailed: FailedIcon,
  TaskRunResultLargerThanAllowedLimit: FailedIcon,
  TaskRunStopSidecarFailed: FailedIcon,
  TaskRunResolutionFailed: FailedIcon,
  TaskRunValidationFailed: FailedIcon,
  TaskValidationFailed: FailedIcon,
  FailureIgnored: FailedIcon,

  // PipelineRun status
  Cancelled: CancelledIcon,
  PipelineRunPending: WaitingIcon,
  PipelineRunTimeout: CancelledIcon,
  PipelineRunStopping: LoadingIcon,
  CancelledRunningFinally: CancelledIcon,
  StoppedRunningFinally: CancelledIcon,
  CouldntGetPipeline: FailedIcon,
  InvalidPipelineResourceBindings: FailedIcon,
  InvalidWorkspaceBindings: FailedIcon,
  InvalidTaskRunSpecs: FailedIcon,
  ParameterTypeMismatch: FailedIcon,
  ObjectParameterMissKeys: FailedIcon,
  ParamArrayIndexingInvalid: FailedIcon,
  CouldntGetTask: FailedIcon,
  ParameterMissing: FailedIcon,
  PipelineValidationFailed: FailedIcon,
  CouldntGetPipelineResult: FailedIcon,
  PipelineInvalidGraph: FailedIcon,
  PipelineRunCouldntCancel: FailedIcon,
  PipelineRunCouldntTimeOut: CancelledIcon,
  InvalidMatrixParameterTypes: FailedIcon,
  InvalidTaskResultReference: FailedIcon,
  RequiredWorkspaceMarkedOptional: FailedIcon,
  ResolvingPipelineRef: FailedIcon,
  CreateRunFailed: FailedIcon,
  CELEvaluationFailed: FailedIcon,
} satisfies Record<Status, BadgeProps>;

type Props = {
  status: Status;
};
export function PipelineRunStatusBadge({ status }: Props) {
  const props = BadgeTemplates[status] || {};
  return <StatusBadgeTemplate {...props}>{status}</StatusBadgeTemplate>;
}

PipelineRunStatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};
