import {
  Chip,
  ChipProps,
  CircularProgress,
  Icon,
} from '@equinor/eds-core-react';
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

import './style.css';

interface StatusProps {
  icon: JSX.Element;
  variant?: 'danger' | 'warning';
}

export type StatusBadgeProps = {
  customIconData?: IconData;
  type?: string;
} & ChipProps;

function getStatus(status: string): StatusProps {
  const data: StatusProps = { icon: null };

  switch (status) {
    case 'stopping':
    case 'running':
      data.icon = <CircularProgress />;
      break;
    case 'danger':
    case 'failed':
    case 'failing':
      data.icon = <Icon data={error_outlined} />;
      data.variant = 'danger';
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
      data.variant = 'warning';
      break;
    default:
      break;
  }

  return data;
}

export const StatusBadge = (props: StatusBadgeProps): JSX.Element => {
  const { children, className, customIconData, type, ...other } = props;

  const status = getStatus(type.toLowerCase());
  if (customIconData) {
    status.icon = <Icon data={customIconData} />;
  }

  const classes = `${status.variant ? ` ${status.variant}` : ''}${
    className ? ` ${className}` : ''
  }${status.icon ? '' : ' center'}`;

  return (
    <Chip className={`status-badge${classes}`} {...other}>
      {status.icon || <></>}
      {children || <></>}
    </Chip>
  );
};

StatusBadge.defaultProps = { type: '' };
