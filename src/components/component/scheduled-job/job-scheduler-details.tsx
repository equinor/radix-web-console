import { List, Typography } from '@equinor/eds-core-react';
import type { FunctionComponent } from 'react';

import type { Component } from '../../../store/radix-api';
import { Alert } from '../../alert';
import { ComponentStatusBadge } from '../../status-badges';

export const JobSchedulerDetails: FunctionComponent<{
  component: Component;
}> = ({ component }) => (
  <>
    <Typography>Job manager:</Typography>
    <List className="o-indent-list">
      <List.Item key="status">
        <div className="grid grid--gap-small grid--auto-columns">
          <Typography>status</Typography>
          <ComponentStatusBadge status={component.status ?? 'Reconciling'} />
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
        component.scheduledJobPayloadPath.length > 0 ? (
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
              {component.notifications.webhook &&
              component.notifications.webhook.length > 0 ? (
                <strong>{component.notifications.webhook}</strong>
              ) : (
                <strong>is empty</strong>
              )}
            </List.Item>
          </List>
        </List.Item>
      )}
    </List>

    {component.status !== 'Consistent' && (
      <Alert>
        Job-scheduler has been manually stopped; please note that new deployment
        will cause it to be restarted
      </Alert>
    )}
  </>
);
