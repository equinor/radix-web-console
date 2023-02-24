import {
  CircularProgress,
  Icon,
  IconProps,
  Popover,
} from '@equinor/eds-core-react';
import {
  check,
  error_outlined,
  report_bug,
  run,
  stop,
  warning_outlined,
} from '@equinor/eds-icons';
import { upperFirst } from 'lodash';
import { useRef, useState } from 'react';

import {
  EnvironmentStatus,
  getEnvironmentStatusType,
} from './environment-status-utils';

import { StatusBadgeTemplate } from '../status-badges/status-badge-template';
import { StatusPopover } from '../status-popover/status-popover';
import { VulnerabilitySummary } from '../vulnerability-summary';
import { VulnerabilitySummaryModel } from '../../models/vulnerability-summary';

import './style.css';

export type EnvironmentCardStatusMap = Record<string, EnvironmentStatus>;

export interface EnvironmentCardStatusProps {
  title?: string;
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

export const EnvironmentVulnerabilityIndicator = ({
  title,
  summary,
  visibleKeys,
  size = 24,
}: {
  title?: string;
  size?: number;
  visibleKeys?: Array<keyof VulnerabilitySummaryModel>;
  summary: VulnerabilitySummaryModel;
}): JSX.Element => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Popover open={popoverOpen} anchorEl={iconRef.current} placement={'top'}>
        {title && (
          <Popover.Header>
            <Popover.Title>{title}</Popover.Title>
          </Popover.Header>
        )}
        <Popover.Content className="grid grid--gap-x-small grid--auto-columns">
          <VulnerabilitySummary summary={summary} visibleKeys={visibleKeys} />
        </Popover.Content>
      </Popover>
      <div
        ref={iconRef}
        onMouseEnter={() => setPopoverOpen(true)}
        onMouseLeave={() => setPopoverOpen(false)}
      >
        <Icon
          data={report_bug}
          size={size as IconProps['size']}
          color={`var(${
            summary.critical > 0
              ? '--eds_interactive_danger__text'
              : summary.high > 0 || summary.unknown > 0
              ? '--eds_interactive_warning__text'
              : summary.medium > 0 || summary.low > 0
              ? '--eds_interactive_success__hover'
              : '--eds_text_static_icons__tertiary'
          })`}
        />
      </div>
    </div>
  );
};

export const EnvironmentCardStatus = ({
  title,
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
      title={title}
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
