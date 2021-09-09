import { Chip, CircularProgress, Icon } from '@equinor/eds-core-react';
import {
  blocked,
  check,
  error_outlined,
  explore,
  time,
  timer,
  traffic_light,
  warning_outlined,
} from '@equinor/eds-icons';
import PropTypes from 'prop-types';

import './style.css';

const getStatus = (status) => {
  const data = { subClass: '', icon: null, variant: status };

  switch (status) {
    case 'stopping':
    case 'running':
      data.icon = <CircularProgress />;
      break;
    case 'danger':
    case 'failed':
    case 'failing':
      data.icon = <Icon data={error_outlined} />;
      data.subClass = 'danger';
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
      data.subClass = 'warning';
      break;
    default:
      break;
  }

  return data;
};

export const StatusBadge = ({
  children,
  className,
  customIconData,
  type,
  ...rest
}) => {
  const status = customIconData
    ? {
        icon: <Icon data={customIconData} />,
        subClass: '',
        variant: type,
      }
    : getStatus(type.toLowerCase());

  const classes = `${status.subClass && ` ${status.subClass}`}${
    className && ` ${className}`
  }${status.icon ? '' : ' center'}`;

  return (
    <Chip
      className={`status-badge${classes}`}
      variant={status.variant}
      {...rest}
    >
      {status.icon ? status.icon : <></>}
      {children ? children : <></>}
    </Chip>
  );
};

StatusBadge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  customIconData: PropTypes.object,
  type: PropTypes.string,
};

StatusBadge.defaultProps = {
  children: null,
  className: '',
  customIconData: null,
  type: 'default',
};

export default StatusBadge;
