import { List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { Alert } from '../../alert';
import { ComponentStatusBadge } from '../../status-badges';
import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../../models/radix-api/deployments/component';
import { ComponentStatus } from '../../../models/radix-api/deployments/component-status';

export interface JobSchedulerDetailsProps {
  component: ComponentModel;
}

export const JobSchedulerDetails: FunctionComponent<
  JobSchedulerDetailsProps
> = ({ component }) => (
  <>
    <Typography>Job manager:</Typography>
    <List className="o-indent-list">
      <List.Item key="status">
        <div className="grid grid--gap-small grid--auto-columns">
          <Typography>status</Typography>
          <ComponentStatusBadge status={component.status} />
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
        {component.scheduledJobPayloadPath?.length > 0 ? (
          <strong>{component.scheduledJobPayloadPath}</strong>
        ) : (
          <strong>is empty</strong>
        )}
      </List.Item>
      {component.notifications && (
        <List.Item key="notifications">
          notifications{' '}
          <List className="o-indent-list">
            <List.Item key="webhook">
              webhook{' '}
              {component.notifications.webhook?.length > 0 ? (
                <strong>{component.notifications.webhook}</strong>
              ) : (
                <strong>is empty</strong>
              )}
            </List.Item>
          </List>
        </List.Item>
      )}
    </List>
    {component.status !== ComponentStatus.ConsistentComponent && (
      <Alert>
        Job-scheduler has been manually stopped; please note that new deployment
        will cause it to be restarted
      </Alert>
    )}
  </>
);

JobSchedulerDetails.propTypes = {
  component: PropTypes.shape(ComponentModelValidationMap)
    .isRequired as PropTypes.Validator<ComponentModel>,
};