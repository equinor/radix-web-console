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
import { toLower } from 'lodash';
import PropTypes from 'prop-types';

import './style.css';

const getStatus = (status) => {
  let data = {
    icon: <></>,
    variant: status ? status : 'default',
  };

  switch (toLower(status)) {
    case 'stopping':
    case 'running':
      data.icon = <CircularProgress />;
      break;
    case 'danger':
    case 'failed':
    case 'failing':
      data.icon = <Icon data={error_outlined} />;
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
      break;
    default:
      break;
  }

  return data;
};

export const StatusBadge = ({ children, type, customIconData, ...rest }) => {
  let status = customIconData
    ? {
        icon: <Icon data={customIconData} />,
        variant: type,
      }
    : getStatus(type);

  return (
    <Chip
      className={'status-badge status-badge--' + toLower(status.variant)}
      variant={status.variant}
      {...rest}
    >
      {status.icon}
      {children ? children : <></>}
    </Chip>
  );
};

StatusBadge.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  customIconData: PropTypes.object,
};

StatusBadge.defaultProps = {
  children: null,
  type: 'default',
  customIconData: null,
};

export default StatusBadge;
