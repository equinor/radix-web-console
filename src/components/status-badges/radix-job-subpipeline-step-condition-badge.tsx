import { CircularProgress, Icon } from '@equinor/eds-core-react';
import { check, error_outlined, traffic_light } from '@equinor/eds-icons';

import {
  StatusBadgeTemplate,
  type StatusBadgeTemplateProps,
} from './status-badge-template';

import type { SubPipelineTaskStep } from '../../store/radix-api';

type JobSubPipelineStepStatus = Required<SubPipelineTaskStep>['status'];

export const JobSubPipelineStepConditionBadgeTemplates = {
  Waiting: { icon: <Icon data={traffic_light} /> },
  Starting: { icon: <Icon data={traffic_light} /> },
  Started: { icon: <Icon data={traffic_light} /> },
  Running: { icon: <CircularProgress /> },
  Succeeded: { icon: <Icon data={check} /> },
  Failed: { type: 'danger', icon: <Icon data={error_outlined} /> },
  ToBeRetried: { type: 'danger', icon: <Icon data={error_outlined} /> },
  TaskRunCancelled: { type: 'danger', icon: <Icon data={error_outlined} /> },
  TaskRunTimeout: { type: 'danger', icon: <Icon data={error_outlined} /> },
  ResolvingTaskRef: { type: 'danger', icon: <Icon data={error_outlined} /> },
  ResolvingStepActionRef: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  TaskRunImagePullFailed: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  TaskRunResultLargerThanAllowedLimit: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  TaskRunStopSidecarFailed: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  InvalidParamValue: { type: 'danger', icon: <Icon data={error_outlined} /> },
  TaskRunResolutionFailed: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  TaskRunValidationFailedTaskValidationFailed: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  ResourceVerificationFailed: {
    type: 'danger',
    icon: <Icon data={error_outlined} />,
  },
  FailureIgnored: { type: 'danger', icon: <Icon data={error_outlined} /> },
  Error: { type: 'danger', icon: <Icon data={error_outlined} /> },
} satisfies Record<JobSubPipelineStepStatus, StatusBadgeTemplateProps>;

type Props = {
  status: JobSubPipelineStepStatus;
};
export const RadixJobSubPipelineStepConditionBadge = ({ status }: Props) => (
  <StatusBadgeTemplate {...JobSubPipelineStepConditionBadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);
