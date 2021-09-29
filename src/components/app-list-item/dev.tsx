import { Typography } from '@equinor/eds-core-react';

import { AppListItem, AppListItemProps, FavouriteClickedHandler } from '.';

import jobStatuses from '../../state/applications/job-statuses';

const noop: FavouriteClickedHandler = (evt, _) => evt.preventDefault();

const testData: Array<{ description: string } & AppListItemProps> = [
  {
    description: 'App, with Job started',
    app: {
      name: 'test-app',
      latestJob: { started: new Date(), status: jobStatuses.SUCCEEDED },
    },
    handler: noop,
  },
  {
    description: 'App, with Job ended',
    app: {
      name: 'test-app',
      latestJob: {
        started: new Date('2021-09-23T08:14:52+0100'),
        ended: new Date('2021-09-23T08:43:36+0100'),
        status: jobStatuses.FAILED,
      },
    },
    handler: noop,
  },
  {
    description: 'App, without Job',
    app: { name: 'test-app', latestJob: null },
    handler: noop,
  },
  {
    description: 'App, marked Favourite',
    app: {
      name: 'test-app',
      latestJob: { started: new Date(), status: jobStatuses.RUNNING },
    },
    handler: noop,
    isFavourite: true,
  },
  {
    description: 'App, marked Placeholder',
    app: { name: '', latestJob: null },
    handler: null,
    isPlaceholder: true,
  },
];

export default (
  <div style={{ padding: '1em', backgroundColor: '#eee' }}>
    {testData.map(({ description, ...rest }, i) => (
      <div key={i} style={{ padding: '1em' }}>
        <Typography variant="h4">{description}</Typography>
        <AppListItem {...rest} />
      </div>
    ))}
  </div>
);
