import { Typography } from '@equinor/eds-core-react';

import { AppListItem, AppListItemProps, FavouriteClickedHandler } from '.';

import { ProgressStatus } from '../../models/radix-api/jobs/progress-status';

const noop: FavouriteClickedHandler = (evt) => evt.preventDefault();

const testData: Array<{ description: string } & AppListItemProps> = [
  {
    description: 'App',
    app: { name: 'test-app' },
    handler: noop,
  },
  {
    description: 'App, marked Favourite, with Job',
    app: {
      name: 'toast-app',
      latestJob: {
        name: 'test-job',
        created: new Date(),
        started: new Date(),
        status: ProgressStatus.Running,
        pipeline: 'abcd',
      },
    },
    handler: noop,
    isFavourite: true,
    showStatus: true,
  },
  {
    description: 'App, marked Favourite, without Job',
    app: { name: 'app-test' },
    handler: noop,
    isFavourite: true,
    showStatus: true,
  },
  {
    description: 'App, marked Placeholder',
    app: { name: 'app-placeholder' },
    handler: noop,
    isPlaceholder: true,
  },
];

export default (
  <div style={{ background: '#eee', padding: 'var(--eds_spacing_medium)' }}>
    {testData.map(({ description, ...rest }, i) => (
      <div key={i} style={{ padding: 'var(--eds_spacing_medium)' }}>
        <Typography variant="h4">{description}</Typography>
        <AppListItem {...rest} />
      </div>
    ))}
  </div>
);
