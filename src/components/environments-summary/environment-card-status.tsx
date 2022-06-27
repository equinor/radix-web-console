import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check,
  error_outlined,
  run,
  stop,
  warning_outlined,
} from '@equinor/eds-icons';

import { StatusBadgeTemplate } from '../status-badges/status-badge-template';
import {
  StatusPopover,
  StatusPopoverType,
} from '../status-popover/status-popover';
import { ComponentModel } from '../../models/component';
import { ComponentStatus } from '../../models/component-status';
import { ReplicaStatus } from '../../models/replica-status';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';

enum EnvironmentStatus {
  Consistent,
  Running,
  Starting,
  Stopped,
  Warning,
  Danger,
}

export interface EnvironmentCardStatusProps {
  components: Array<ComponentModel>;
}

const StatusIconMap: { [key: string]: JSX.Element } = {
  [EnvironmentStatus.Consistent]: <Icon data={check} />,
  [EnvironmentStatus.Running]: <Icon data={run} />,
  [EnvironmentStatus.Starting]: <CircularProgress />,
  [EnvironmentStatus.Stopped]: <Icon data={stop} />,
  [EnvironmentStatus.Warning]: <Icon data={warning_outlined} />,
  [EnvironmentStatus.Danger]: <Icon data={error_outlined} />,
};

const ComponentCardStatus = {
  [ComponentStatus.ConsistentComponent]: EnvironmentStatus.Consistent,
  [ComponentStatus.StoppedComponent]: EnvironmentStatus.Stopped,
};

const ReplicaCardStatus = {
  [ReplicaStatus.Succeeded]: EnvironmentStatus.Consistent,
  [ReplicaStatus.Running]: EnvironmentStatus.Running,
  [ReplicaStatus.Starting]: EnvironmentStatus.Starting,
};

function getStatusColorType(status: EnvironmentStatus): StatusPopoverType {
  switch (status) {
    case EnvironmentStatus.Warning:
      return 'warning';
    case EnvironmentStatus.Danger:
      return 'danger';
    default:
      return 'none';
  }
}

function deriveComponentStatus(
  components: Array<ComponentModel>
): Array<{ title: string; status: EnvironmentStatus }> {
  if (!(components?.length > 0)) return [];

  const status: Array<{ title: string; status: EnvironmentStatus }> = [];
  const replicas = components.reduce<Array<ReplicaSummaryNormalizedModel>>(
    (obj, x) => {
      x.replicaList?.forEach((x) => obj.push(x));
      return obj;
    },
    []
  );

  status.push({
    title: 'Components',
    status: components.reduce<EnvironmentStatus>(
      (obj, x) =>
        Math.max(
          ComponentCardStatus[x.status] ?? EnvironmentStatus.Warning,
          obj
        ),
      EnvironmentStatus.Consistent
    ),
  });

  if (replicas.length > 0) {
    status.push({
      title: 'Replicas',
      status: replicas.reduce<EnvironmentStatus>(
        (obj, x) =>
          Math.max(
            ReplicaCardStatus[x.status] ?? EnvironmentStatus.Warning,
            obj
          ),
        EnvironmentStatus.Consistent
      ),
    });
  }

  return status;
}

export const EnvironmentCardStatus = ({
  components,
}: EnvironmentCardStatusProps): JSX.Element => {
  const componentStatus = deriveComponentStatus(components);

  return (
    <StatusPopover
      placement="top"
      type={getStatusColorType(
        componentStatus.reduce(
          (obj, x) => Math.max(obj, x.status),
          EnvironmentStatus.Consistent
        )
      )}
    >
      <div className="grid grid--gap-small">
        {componentStatus.map(({ title, status }) => (
          <StatusBadgeTemplate
            key={title}
            type={getStatusColorType(status)}
            icon={StatusIconMap[status]}
          >
            {title}
          </StatusBadgeTemplate>
        ))}
      </div>
    </StatusPopover>
  );
};
