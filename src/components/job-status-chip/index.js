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

import jobStatus from '../../state/applications/job-statuses';

import './style.css';

const getStatus = (status) => {
  let data = {
    icon: <></>,
    variant: status ? status : 'default',
  };

  switch (status) {
    case jobStatus.STOPPING:
    case jobStatus.RUNNING:
      data.icon = <CircularProgress />;
      break;
    case jobStatus.FAILED:
      data.icon = <Icon data={error_outlined} />;
      break;
    case jobStatus.IDLE:
      data.icon = <Icon data={explore} />;
      break;
    case jobStatus.PENDING:
      data.icon = <Icon data={time} />;
      break;
    case jobStatus.QUEUED:
      data.icon = <Icon data={timer} />;
      break;
    case jobStatus.WAITING:
      data.icon = <Icon data={traffic_light} />;
      break;
    case jobStatus.STOPPED:
      data.icon = <Icon data={blocked} />;
      break;
    case jobStatus.SUCCEEDED:
      data.icon = <Icon data={check} />;
      break;
    case jobStatus.UNKNOWN:
      data.icon = <Icon data={warning_outlined} />;
      break;
    default:
      break;
  }

  return data;
};

export const JobStatusChip = ({ children, type, customIconData, ...rest }) => {
  let status = customIconData
    ? {
        icon: <Icon data={customIconData} />,
        variant: type,
      }
    : getStatus(type);

  return (
    <Chip
      className={'status-badge status-badge--' + toLower(type)}
      variant={status.variant}
      {...rest}
    >
      {status.icon}
      {children ? children : <></>}
    </Chip>
  );
};

JobStatusChip.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  customIconData: PropTypes.object,
};

JobStatusChip.defaultProps = { children: null, type: '', customIconData: null };

export default JobStatusChip;
