import { Typography } from '@equinor/eds-core-react';

import {
  AppListItem,
  type AppListItemProps,
  type FavouriteClickedHandler,
} from '.';

const noop: FavouriteClickedHandler = (evt) => evt.preventDefault();

const testData: Array<{ description: string } & AppListItemProps> = [
  {
    description: 'App',
    app: { name: 'test-app' },
    handler: noop,
    isLoaded: true,
    name: 'some-app',
  },
  {
    description: 'App, marked Favourite, with Job',
    app: {
      name: 'toast-app',
      latestJob: {
        name: 'test-job',
        created: new Date().toISOString(),
        started: new Date().toISOString(),
        status: 'Running',
        pipeline: 'build-deploy',
      },
    },
    handler: noop,
    isFavourite: true,
    showStatus: true,
    isLoaded: true,
    name: 'some-app',
  },
  {
    description: 'App, marked Favourite, without Job',
    app: { name: 'app-test' },
    handler: noop,
    isFavourite: true,
    showStatus: true,
    isLoaded: true,
    name: 'some-app',
  },
  {
    description: 'App, marked Placeholder',
    app: { name: 'app-placeholder' },
    handler: noop,
    isPlaceholder: true,
    isLoaded: true,
    name: 'some-app',
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
