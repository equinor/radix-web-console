import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check,
  error_outlined,
  run,
  stop,
  warning_outlined,
} from '@equinor/eds-icons';

import {
  aggregateComponentEnvironmentStatus,
  aggregateReplicaEnvironmentStatus,
  EnvironmentStatus,
  getEnvironmentStatusType,
} from './environment-status-utils';

import { StatusBadgeTemplate } from '../status-badges/status-badge-template';
import { StatusPopover } from '../status-popover/status-popover';
import { ComponentModel } from '../../models/component';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import { VulnerabilitySummaryModel } from '../../models/vulnerability-summary';

import './style.css';

export interface EnvironmentCardStatusProps {
  components: Array<ComponentModel>;
  vulnerabilities?: VulnerabilitySummaryModel;
}

const StatusIconMap: Record<EnvironmentStatus, JSX.Element> = {
  [EnvironmentStatus.Consistent]: <Icon data={check} />,
  [EnvironmentStatus.Running]: <Icon data={run} />,
  [EnvironmentStatus.Starting]: <CircularProgress />,
  [EnvironmentStatus.Stopped]: <Icon data={stop} />,
  [EnvironmentStatus.Warning]: <Icon data={warning_outlined} />,
  [EnvironmentStatus.Danger]: <Icon data={error_outlined} />,
};

function getStatusIcon(status: EnvironmentStatus): JSX.Element {
  switch (status) {
    case EnvironmentStatus.Warning:
      return <Icon data={warning_outlined} />;
    case EnvironmentStatus.Danger:
      return <Icon data={error_outlined} />;
    default:
      return <Icon data={check} />;
  }
}

function deriveEnvironmentStatus(
  components: Array<ComponentModel>,
  vulnerabilities: VulnerabilitySummaryModel
): Array<{ title: string; status: EnvironmentStatus }> {
  const status: Array<{ title: string; status: EnvironmentStatus }> = [];
  const replicas = components?.reduce<Array<ReplicaSummaryNormalizedModel>>(
    (obj, x) => [...obj, ...x.replicaList],
    []
  );

  status.push(
    {
      title: 'Components',
      status: aggregateComponentEnvironmentStatus(components),
    },
    replicas?.length > 0 && {
      title: 'Replicas',
      status: aggregateReplicaEnvironmentStatus(replicas),
    },
    {
      title: 'Vulnerabilities',
      status: vulnerabilities.critical
        ? EnvironmentStatus.Danger
        : vulnerabilities.high
        ? EnvironmentStatus.Warning
        : EnvironmentStatus.Consistent,
    }
  );

  return status.filter((x) => !!x);
}

export const EnvironmentCardStatus = ({
  components,
  vulnerabilities,
}: EnvironmentCardStatusProps): JSX.Element => {
  const environmentStatus = deriveEnvironmentStatus(
    components,
    vulnerabilities
  );
  const aggregatedStatus: EnvironmentStatus = environmentStatus.reduce(
    (obj, { status }) => Math.max(obj, status),
    EnvironmentStatus.Consistent
  );

  return (
    <StatusPopover
      type={getEnvironmentStatusType(aggregatedStatus)}
      icon={getStatusIcon(aggregatedStatus)}
    >
      <div className="grid grid--gap-small">
        {environmentStatus.map(({ title, status }) => (
          <StatusBadgeTemplate
            key={title}
            type={getEnvironmentStatusType(status)}
            icon={StatusIconMap[status]}
          >
            {title}
          </StatusBadgeTemplate>
        ))}
      </div>
    </StatusPopover>
  );
};
