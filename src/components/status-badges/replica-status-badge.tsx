import { CircularProgress, Icon } from '@equinor/eds-core-react';
import { error_outlined, run, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

import { ReplicaSummary } from '../../store/radix-api';

const BadgeTemplates: Record<
  ReplicaSummary['replicaStatus']['status'],
  Pick<StatusBadgeTemplateProps, 'icon' | 'type'>
> = {
  Pending: { icon: <Icon data={time} /> },
  Failed: { type: 'danger', icon: <Icon data={error_outlined} /> },
  Failing: { type: 'danger', icon: <Icon data={error_outlined} /> },
  Running: { icon: <Icon data={run} /> },
  Starting: { icon: <CircularProgress /> },
  Terminated: undefined,
};

export const ReplicaStatusBadge: FunctionComponent<{
  status: ReplicaSummary['replicaStatus']['status'];
}> = ({ status }) => (
  <StatusBadgeTemplate {...BadgeTemplates[status]}>
    {status}
  </StatusBadgeTemplate>
);

ReplicaStatusBadge.propTypes = {
  status: PropTypes.string.isRequired as PropTypes.Validator<
    ReplicaSummary['replicaStatus']['status']
  >,
};
