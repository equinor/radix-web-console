import { type ChipProps, Icon } from '@equinor/eds-core-react';
import {
  type IconData,
  blocked,
  check,
  error_outlined,
  run,
  timer,
  traffic_light,
  warning_outlined,
} from '@equinor/eds-icons';

import {
  StatusBadgeTemplate,
  type StatusBadgeTemplateProps,
} from './status-badge-template';

const BadgeTemplates = {
  running: { icon: <Icon data={run} /> },
  danger: { icon: <Icon data={error_outlined} />, type: 'danger' },
  failed: { icon: <Icon data={error_outlined} />, type: 'danger' },
  queued: { icon: <Icon data={timer} /> },
  waiting: { icon: <Icon data={traffic_light} /> },
  stopped: { icon: <Icon data={blocked} /> },
  stoppednochanges: { icon: <Icon data={blocked} /> },
  success: { icon: <Icon data={check} /> },
  succeeded: { icon: <Icon data={check} /> },
  unknown: { icon: <Icon data={warning_outlined} />, type: 'warning' },
  warning: { icon: <Icon data={warning_outlined} />, type: 'warning' },
} satisfies Record<string, StatusBadgeTemplateProps>;

export type GenericStatusBadgeProps = {
  customIconData?: IconData;
  type: keyof typeof BadgeTemplates;
} & ChipProps;
export const GenericStatusBadge = ({
  customIconData,
  type,
  ...rest
}: GenericStatusBadgeProps) => (
  <StatusBadgeTemplate
    {...{
      ...rest,
      ...BadgeTemplates[type.toLowerCase()],
      ...(!!customIconData && { icon: <Icon data={customIconData} /> }),
    }}
  />
);
