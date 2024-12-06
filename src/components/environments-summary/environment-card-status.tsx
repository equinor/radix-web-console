import {
  CircularProgress,
  Icon,
  type IconProps,
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
import { upperFirst } from 'lodash-es';
import type React from 'react';
import { useRef, useState } from 'react';
import type { ImageScan, Vulnerability } from '../../store/scan-api';
import { StatusBadgeTemplate } from '../status-badges/status-badge-template';
import { StatusPopover } from '../status-popover/status-popover';
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

type Props = {
  title?: string;
  size?: number;
  visibleKeys?: Array<Lowercase<Vulnerability['severity']>>;
  summary: Required<ImageScan>['vulnerabilitySummary'];
};
export const EnvironmentVulnerabilityIndicator = ({
  title,
  summary,
  size = 24,
  ...rest
}: Props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Popover
        open={popoverOpen}
        anchorEl={containerRef.current}
        placement={'top'}
      >
        {title && (
          <Popover.Header>
            <Popover.Title>{title}</Popover.Title>
          </Popover.Header>
        )}
        <Popover.Content className="grid grid--gap-x-small grid--auto-columns">
          <VulnerabilitySummary summary={summary} {...rest} />
        </Popover.Content>
      </Popover>
      <div
        ref={containerRef}
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
    </>
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
