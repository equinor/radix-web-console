import componentModel from '../../models/component';
import EnvVariables from '../component/env-variables';
import PropTypes from 'prop-types';
import React from 'react';
import Alert from '../alert';
import { List, Typography } from '@equinor/eds-core-react';
import StatusBadge from '../status-badge';

const JobSchedulerDetails = ({ component }) => {
  return (
    <React.Fragment>
      <Typography>Job Scheduler:</Typography>
      <List className="o-indent-list">
        <List.Item key="status">
          <div className="component-status">
            <Typography>status</Typography>
            <StatusBadge type={component.status}>
              {component.status}
            </StatusBadge>
          </div>
        </List.Item>
        <List.Item key="port">
          port <strong>{component.schedulerPort}</strong>
        </List.Item>
        <List.Item key="url">
          URL{' '}
          <strong>
            http://{component.name}:{component.schedulerPort}/api/v1
          </strong>
        </List.Item>
        <List.Item key="payload-path">
          payload path{' '}
          {component.scheduledJobPayloadPath &&
            component.scheduledJobPayloadPath.length > 0 && (
              <strong>{component.scheduledJobPayloadPath}</strong>
            )}
          {!component.scheduledJobPayloadPath ||
            (component.scheduledJobPayloadPath.length <= 0 && (
              <strong>is empty</strong>
            ))}
        </List.Item>
      </List>
      {component.status !== 'Consistent' && (
        <Alert>
          Job-scheduler has been manually stopped; please note that new
          deployment will cause it to be restarted
        </Alert>
      )}
    </React.Fragment>
  );
};

EnvVariables.propTypes = {
  component: PropTypes.shape(componentModel),
};

export default JobSchedulerDetails;
