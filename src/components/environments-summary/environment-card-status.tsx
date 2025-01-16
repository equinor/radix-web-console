import { CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  check,
  error_outlined,
  report_bug,
  run,
  stop,
  warning_outlined,
} from '@equinor/eds-icons';
import { upperFirst } from 'lodash-es';
import type React from 'react';
import type { ImageScan, Vulnerability } from '../../store/scan-api';
import { StatusBadgeTemplate } from '../status-badges/status-badge-template';
import {
  StatusPopover,
  type StatusPopoverType,
} from '../status-popover/status-popover';
import { VulnerabilitySummary } from '../vulnerability-summary';
import {
  EnvironmentStatus,
  getEnvironmentStatusType,
} from './environment-status-utils';
import './style.css';

export type EnvironmentCardStatusMap = Record<string, EnvironmentStatus>;

const StatusIconMap: Record<EnvironmentStatus, React.JSX.Element> = {
  [EnvironmentStatus.Consistent]: <Icon data={check} />,
  [EnvironmentStatus.Running]: <Icon data={run} />,
  [EnvironmentStatus.Starting]: <CircularProgress />,
  [EnvironmentStatus.Stopped]: <Icon data={stop} />,
  [EnvironmentStatus.Warning]: <Icon data={warning_outlined} />,
  [EnvironmentStatus.Danger]: <Icon data={error_outlined} />,
};

const EnvironmentStatusIcon = ({ status }: { status: EnvironmentStatus }) => {
  switch (status) {
    case EnvironmentStatus.Warning:
      return (
        <Icon
          className="env_card-indicator--warning"
          data={warning_outlined}
          size={18}
        />
      );
    case EnvironmentStatus.Danger:
      return <Icon data={error_outlined} />;
    default:
      return <Icon data={check} />;
  }
};

type VulnerabilitySummaryType = Required<ImageScan>['vulnerabilitySummary'];
type Props = {
  title: string;
  size?: number;
  visibleKeys?: Array<Lowercase<Vulnerability['severity']>>;
  summary: VulnerabilitySummaryType;
};
export const EnvironmentVulnerabilityIndicator = ({
  title,
  summary,
  size = 24,
  ...rest
}: Props) => {
  let type: StatusPopoverType = 'none';
  if (summary.medium > 0 || summary.low > 0) type = 'success';
  if (summary.high > 0 || summary.unknown > 0) type = 'warning';
  if (summary.critical > 0) type = 'danger';

  return (
    <StatusPopover title={title} icon={<Icon data={report_bug} />} type={type}>
      <div className="grid grid--gap-x-small grid--auto-columns">
        <VulnerabilitySummary summary={summary} {...rest} />
      </div>
    </StatusPopover>
  );
};

export interface EnvironmentCardStatusProps {
  title?: string;
  statusElements: EnvironmentCardStatusMap;
}

export const EnvironmentCardStatus = ({
  title,
  statusElements,
}: EnvironmentCardStatusProps) => {
  const keys = Object.keys(statusElements ?? {});
  const aggregatedStatus: EnvironmentStatus = keys.reduce(
    (obj, key) =>
      Math.max(obj, statusElements[key] ?? EnvironmentStatus.Consistent),
    EnvironmentStatus.Consistent
  );

  return (
    <StatusPopover
      title={title}
      type={getEnvironmentStatusType(aggregatedStatus)}
      icon={<EnvironmentStatusIcon status={aggregatedStatus} />}
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
