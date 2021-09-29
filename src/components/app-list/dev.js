import { AppList } from '.';

import jobStatuses from '../../state/applications/job-statuses';

const apps = [
  {
    name: 'radix-web-console',
  },
  {
    latestJob: {
      triggeredBy: '',
      commitID: '4faca8595c5283a9d0f17a623b9255a0d9866a2e',
      created: new Date('2006-01-02T15:04:05-0700'),
      ended: new Date('2006-01-02T15:04:05-0700'),
      environments: ['dev', 'qa'],
      name: 'radix-pipeline-20181029135644-algpv-6hznh',
      pipeline: 'build-deploy',
      started: new Date('2006-01-02T15:04:05-0700'),
      status: jobStatuses.RUNNING,
    },
    name: 'radix-canary-golang',
  },
  {
    latestJob: {
      triggeredBy: '',
      commitID: '4faca8595c5283a9d0f17a623b9255a0d9866a2e',
      created: new Date('2006-01-02T15:04:05-0700'),
      ended: new Date('2006-01-02T15:04:05-0700'),
      environments: ['dev', 'qa'],
      name: 'radix-pipeline-20181029135644-algpv-6hznh',
      pipeline: 'build-deploy',
      started: new Date('2006-01-02T15:04:05-0700'),
      status: jobStatuses.FAILED,
    },
    name: 'radix-web-console3',
  },
  {
    latestJob: {
      triggeredBy: 'USER@equinor.com',
      commitID: '4faca8595c5283a9d0f17a623b9255a0d9866a2e',
      created: new Date('2006-01-02T15:04:05-0700'),
      ended: new Date('2006-01-02T15:04:05-0700'),
      environments: ['dev', 'qa'],
      name: 'radix-pipeline-20181029135644-algpv-6hznh',
      pipeline: 'build-deploy',
      started: new Date('2006-01-02T15:04:05-0700'),
      status: jobStatuses.SUCCEEDED,
    },
    name: 'radix-api',
  },
  {
    latestJob: {
      triggeredBy: 'USER@equinor.com',
      commitID: '4faca8595c5283a9d0f17a623b9255a0d9866a2e',
      created: new Date('2006-01-02T15:04:05-0700'),
      ended: new Date('2006-01-02T15:04:05-0700'),
      environments: ['dev', 'qa'],
      name: 'radix-pipeline-20181029135644-algpv-6hznh',
      pipeline: 'build-deploy',
      started: new Date('2006-01-02T15:04:05-0700'),
      status: jobStatuses.RUNNING,
    },
    name: 'radix-extreme-test-of-name-length-so-that-ui-is-okay',
  },
  {
    latestJob: {
      triggeredBy: 'TEST@equinor.com',
      commitID: '4faca8595c5283a9d0f17a623b9255a0d9866a2e',
      created: new Date('2006-01-02T15:04:05-0700'),
      ended: new Date('2006-01-02T15:04:05-0700'),
      environments: ['dev', 'qa'],
      name: 'radix-pipeline-20181029135644-algpv-6hznh',
      pipeline: 'build-deploy',
      started: new Date('2006-01-02T15:04:05-0700'),
      status: jobStatuses.FAILED,
    },
    name: 'radix-extreme-test-of-name-length-so-that-ui-is-okay-2',
  },
];

const favouritAppNames = [];
const lastKnownAppNames = [];
const noop = () => {};
const appsResponse = { data: apps };
const emptyResponse = { data: null };
const getApps = () => appsResponse;
const getNoApps = () => emptyResponse;

export default (
  <div
    style={{
      maxWidth: '990px',
      margin: 'auto',
      marginTop: '20px',
      padding: '1rem',
    }}
  >
    <div style={{ height: '100px' }} />
    <AppList
      toggleFavouriteApplication={noop}
      setLastKnownApplicationNames={noop}
      pollApplicationsByNames={getApps}
      pollApplications={getApps}
      favouriteAppNames={favouritAppNames}
      lastKnownAppNames={lastKnownAppNames}
    />
    <div style={{ height: '100px' }} />
    <AppList
      toggleFavouriteApplication={noop}
      setLastKnownApplicationNames={noop}
      pollApplicationsByNames={getNoApps}
      pollApplications={getNoApps}
      favouriteAppNames={favouritAppNames}
      lastKnownAppNames={lastKnownAppNames}
    />
  </div>
);
