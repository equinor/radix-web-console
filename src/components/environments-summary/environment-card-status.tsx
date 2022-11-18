import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check,
  error_outlined,
  run,
  stop,
  warning_outlined,
} from '@equinor/eds-icons';
import { upperFirst } from 'lodash';

import {
  EnvironmentStatus,
  getEnvironmentStatusType,
} from './environment-status-utils';

import { StatusBadgeTemplate } from '../status-badges/status-badge-template';
import { StatusPopover } from '../status-popover/status-popover';

import './style.css';

export type EnvironmentCardStatusMap = Record<string, EnvironmentStatus>;

export interface EnvironmentCardStatusProps {
  statusElements: EnvironmentCardStatusMap;
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

export const EnvironmentCardStatus = ({
  statusElements,
}: EnvironmentCardStatusProps): JSX.Element => {
  const keys = Object.keys(statusElements ?? {});

  const aggregatedStatus: EnvironmentStatus = keys.reduce(
    (obj, key) =>
      Math.max(obj, statusElements[key] ?? EnvironmentStatus.Consistent),
    EnvironmentStatus.Consistent
  );

  return (
    <StatusPopover
      type={getEnvironmentStatusType(aggregatedStatus)}
      icon={getStatusIcon(aggregatedStatus)}
    >
      <div className="grid grid--gap-small">
        {keys.map((key) => (
          <StatusBadgeTemplate
            key={key}
            type={getEnvironmentStatusType(statusElements[key])}
            icon={StatusIconMap[statusElements[key]]}
          >
            {upperFirst(key)}
          </StatusBadgeTemplate>
        ))}
      </div>
    </StatusPopover>
  );
};
