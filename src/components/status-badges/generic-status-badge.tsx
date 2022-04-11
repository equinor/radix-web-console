import { ChipProps, CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  blocked,
  check,
  error_outlined,
  explore,
  IconData,
  time,
  timer,
  traffic_light,
  warning_outlined,
} from '@equinor/eds-icons';

import {
  StatusBadgeTemplate,
  StatusBadgeTemplateProps,
} from './status-badge-template';

export type GenericStatusBadgeProps = {
  customIconData?: IconData;
  type?: string;
} & ChipProps;

function getGenericStatus(status: string): StatusBadgeTemplateProps {
  const data: StatusBadgeTemplateProps = {};

  switch (status) {
    case 'stopping':
    case 'running':
      data.icon = <CircularProgress />;
      break;
    case 'danger':
    case 'failed':
    case 'failing':
      data.icon = <Icon data={error_outlined} />;
      data.type = 'danger';
      break;
    case 'idle':
      data.icon = <Icon data={explore} />;
      break;
    case 'pending':
      data.icon = <Icon data={time} />;
      break;
    case 'queued':
      data.icon = <Icon data={timer} />;
      break;
    case 'waiting':
      data.icon = <Icon data={traffic_light} />;
      break;
    case 'stopped':
      data.icon = <Icon data={blocked} />;
      break;
    case 'success':
    case 'succeeded':
      data.icon = <Icon data={check} />;
      break;
    case 'unknown':
    case 'warning':
      data.icon = <Icon data={warning_outlined} />;
      data.type = 'warning';
      break;
    default:
      break;
  }

  return data;
}

/** GenericStatusBadge */
export const GenericStatusBadge = ({
  customIconData,
  type,
  ...rest
}: GenericStatusBadgeProps): JSX.Element => {
  const status = getGenericStatus(type?.toLowerCase() || '');
  if (customIconData) {
    status.icon = <Icon data={customIconData} />;
  }

  return (
    <StatusBadgeTemplate icon={status.icon} type={status.type} {...rest} />
  );
};

/** GenericStatusBadgeProps alias */
export type StatusBadgeProps = GenericStatusBadgeProps;
/** GenericStatusBadge alias */
export const StatusBadge = GenericStatusBadge;
