import React from 'react';
import jobStatuses from '../../state/applications/job-statuses';

import { AppList } from '.';
import AppListItem from '../app-list-item';

const apps = [
  {
    name: 'radix-web-console',
  },
  {
    latestJob: {
      appName: 'radix-pipeline-20181029135644-algpv-6hznh',
      branch: 'master',
      commitID: '4faca8595c5283a9d0f17a623b9255a0d9866a2e',
      ended: '2006-01-02T15:04:05-0700',
      environments: 'dev,qa',
      name: 'radix-pipeline-20181029135644-algpv-6hznh',
      pipeline: 'build-deploy',
      created: '2006-01-02T15:04:05-0700',
      started: '2006-01-02T15:04:05-0700',
      status: jobStatuses.RUNNING,
    },
    name: 'radix-canary-golang',
  },
  {
    latestJob: {
      appName: 'radix-pipeline-20181029135644-algpv-6hznh',
      branch: 'master',
      commitID: '4faca8595c5283a9d0f17a623b9255a0d9866a2e',
      ended: '2006-01-02T15:04:05-0700',
      environments: 'dev,qa',
      name: 'radix-pipeline-20181029135644-algpv-6hznh',
      pipeline: 'build-deploy',
      created: '2006-01-02T15:04:05-0700',
      started: '2006-01-02T15:04:05-0700',
      status: jobStatuses.FAILED,
    },
    name: 'radix-web-console3',
  },
  {
    latestJob: {
      appName: 'radix-pipeline-20181029135644-algpv-6hznh',
      branch: 'master',
      commitID: '4faca8595c5283a9d0f17a623b9255a0d9866a2e',
      ended: '2006-01-02T15:04:05-0700',
      environments: 'dev,qa',
      name: 'radix-pipeline-20181029135644-algpv-6hznh',
      pipeline: 'build-deploy',
      created: '2006-01-02T15:04:05-0700',
      started: '2006-01-02T15:04:05-0700',
      status: jobStatuses.SUCCEEDED,
    },
    name: 'radix-api',
  },
  {
    latestJob: {
      appName: 'radix-pipeline-20181029135644-algpv-6hznh',
      branch: 'master',
      commitID: '4faca8595c5283a9d0f17a623b9255a0d9866a2e',
      ended: '2006-01-02T15:04:05-0700',
      environments: 'dev,qa',
      name: 'radix-pipeline-20181029135644-algpv-6hznh',
      pipeline: 'build-deploy',
      created: '2006-01-02T15:04:05-0700',
      started: '2006-01-02T15:04:05-0700',
      status: jobStatuses.RUNNING,
    },
    name: 'radix-extreme-test-of-name-length-so-that-ui-is-okay',
  },
  {
    latestJob: {
      appName: 'radix-pipeline-20181029135644-algpv-6hznh',
      branch: 'master',
      commitID: '4faca8595c5283a9d0f17a623b9255a0d9866a2e',
      ended: '2006-01-02T15:04:05-0700',
      environments: 'dev,qa',
      name: 'radix-pipeline-20181029135644-algpv-6hznh',
      pipeline: 'build-deploy',
      created: '2006-01-02T15:04:05-0700',
      started: '2006-01-02T15:04:05-0700',
      status: jobStatuses.FAILED,
    },
    name: 'radix-extreme-test-of-name-length-so-that-ui-is-okay-2',
  },
];

export default (
  <div
    style={{
      maxWidth: '990px',
      margin: 'auto',
      marginTop: '20px',
      padding: '1rem',
    }}
  >
    <div className="app-list__list">
      <AppListItem app={{ isPlaceHolder: true }} />
      <AppListItem app={{ isPlaceHolder: true }} />
      <AppListItem app={{ isPlaceHolder: true }} />
      <AppListItem app={{ isPlaceHolder: true }} />
    </div>
    <div style={{ height: '100px' }} />
    <AppList
      apps={apps}
      subscribeApplications={() => {}}
      unsubscribeApplications={() => {}}
    />
    <div style={{ height: '100px' }} />
    <AppList
      apps={[]}
      subscribeApplications={() => {}}
      unsubscribeApplications={() => {}}
    />
  </div>
);
