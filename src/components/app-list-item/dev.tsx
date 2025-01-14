import { Typography } from '@equinor/eds-core-react';

import { addMinutes } from 'date-fns';
import {
  AppListItemLayout,
  type AppListItemLayoutProps,
  type FavouriteClickedHandler,
} from '.';

const noop: FavouriteClickedHandler = (evt) => evt.preventDefault();

const testData = [
  {
    description: 'App',
    isLoading: false,
    handler: noop,
    appName: 'some-app',
  },
  {
    description: 'App, marked Favourite, with Job',
    isLoading: false,
    latestJob: {
      name: 'running-job-app',
      created: addMinutes(new Date(), -15).toISOString(),
      started: addMinutes(new Date(), -14).toISOString(),
      status: 'Running',
      pipeline: 'build-deploy',
    },
    vulnerabilitySummary: [
      {
        components: {
          web: {
            image: 'test:test',
            scanSuccess: true,
            scanTime: '2020-02-02T12:00:00Z',
            vulnerabilitySummary: {
              critical: 2,
              high: 1,
              medium: 2,
              low: 5,
            },
          },
        },
        name: 'dev',
      },
    ],
    utilization: {
      environments: {
        dev: {
          components: {
            web: {
              replicas: {
                'web-abcd-1': {
                  cpuAverage: 1.1,
                  cpuRequests: 1.0,
                  memoryMaximum: 900,
                  memoryRequests: 1000,
                },
              },
            },
          },
        },
      },
    },
    handler: noop,
    isFavourite: true,
    showStatus: true,
    appName: 'favorite-app-with-problems',
  },
  {
    description: 'App, marked Favourite, without Job',
    isLoading: false,
    handler: noop,
    isFavourite: true,
    showStatus: true,
    appName: 'fav-app-without-job',
  },
  {
    description: 'App, marked Placeholder',
    isLoading: false,
    handler: noop,
    isPlaceholder: true,
    appName: 'placeholder-app',
  },
  {
    description: 'Deleted App',
    isLoading: false,
    handler: noop,
    isPlaceholder: false,
    isFavourite: true,
    showStatus: true,
    isDeleted: true,
    appName: 'deleted-app',
  },
] satisfies Array<{ description: string } & AppListItemLayoutProps>;

export default (
  <div style={{ background: '#eee', padding: 'var(--eds_spacing_medium)' }}>
    {testData.map(({ description, ...rest }, i) => (
      <div key={i} style={{ padding: 'var(--eds_spacing_medium)' }}>
        <Typography variant="h4">{description}</Typography>
        <AppListItemLayout {...rest} />
      </div>
    ))}
  </div>
);
