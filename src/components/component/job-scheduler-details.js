import componentModel from '../../models/component';
import EnvVariables from '../component/env-variables';
import PropTypes from 'prop-types';
import React from 'react';
import Alert from '../alert';

const JobSchedulerDetails = ({ component }) => {
  return (
    <React.Fragment>
      <p>Job Scheduler:</p>
      <ul className="o-indent-list">
        <li key="status">
          status <strong>{component.status}</strong>
        </li>
        <li key="port">
          port <strong>{component.schedulerPort}</strong>
        </li>
        <li key="url">
          URL{' '}
          <strong>
            http://{component.name}:{component.schedulerPort}/api/v1
          </strong>
        </li>
        <li key="payload-path">
          payload{' '}
          {component.scheduledJobPayloadPath &&
            component.scheduledJobPayloadPath.length > 0 && (
              <strong>{component.scheduledJobPayloadPath}</strong>
            )}
          {!component.scheduledJobPayloadPath ||
            (component.scheduledJobPayloadPath.length <= 0 && (
              <strong>is empty</strong>
            ))}
        </li>
      </ul>
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
