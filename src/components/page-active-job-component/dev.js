import React from 'react';
import ScheduledJobList from '../component/scheduled-job-list';

const noop = () => null;

const test1 = {
  appName: 'some_app_name',
  envName: 'test-env',
  jobComponentName: 'job-JQERS1',
  scheduledJobList: [
    {
      created: new Date('2021-07-28T06:33:34.000Z'),
      ended: new Date('2021-07-28T06:33:34.000Z'),
      name: 'testing2',
      started: new Date('2021-07-28T06:33:34.000Z'),
      status: 'Waiting', // 'Waiting','Queued',Running','Succeeded','Stopping','Stopped','Failed'
      replicaList: [
        {
          name: 'rep-113ds',
          created: new Date('2021-07-28T06:33:34.000Z'),
          status: 'Failing',
          restartCount: 1,
          statusMessage: 'Status_msg_test',
        },
      ],
      totalJobCount: 0,
    },
    {
      created: new Date('2021-07-28T06:33:34.000Z'),
      ended: new Date('2021-07-28T06:33:34.000Z'),
      name: '1234567-job-test',
      started: new Date('2021-07-28T06:33:34.000Z'),
      status: 'Queued',
      replicaList: [
        {
          name: 'rep-113ds',
          created: new Date('2021-07-28T06:33:34.000Z'),
          status: 'Failing',
          restartCount: 1,
          statusMessage: 'Status_msg_test',
        },
      ],
      totalJobCount: 0,
    },
    {
      created: new Date('2021-07-28T06:33:34.000Z'),
      ended: new Date('2021-07-28T06:33:34.000Z'),
      name: '1234567-job-test',
      started: new Date('2021-07-28T06:33:34.000Z'),
      status: 'Running',
      replicaList: [
        {
          name: 'rep-113ds',
          created: new Date('2021-07-28T06:33:34.000Z'),
          status: 'Failing',
          restartCount: 1,
          statusMessage: 'Status_msg_test',
        },
      ],
      totalJobCount: 0,
    },
    {
      created: new Date('2021-07-28T06:33:34.000Z'),
      ended: new Date('2021-07-28T06:33:34.000Z'),
      name: '1234567-job-test',
      started: new Date('2021-07-28T06:33:34.000Z'),
      status: 'Succeeded',
      replicaList: [
        {
          name: 'rep-113ds',
          created: new Date('2021-07-28T06:33:34.000Z'),
          status: 'Failing',
          restartCount: 1,
          statusMessage: 'Status_msg_test',
        },
      ],
      totalJobCount: 0,
    },
    {
      created: new Date('2021-07-28T06:33:34.000Z'),
      ended: new Date('2021-07-28T06:33:34.000Z'),
      name: '1234567-job-test',
      started: new Date('2021-07-28T06:33:34.000Z'),
      status: 'Stopping',
      replicaList: [
        {
          name: 'rep-113ds',
          created: new Date('2021-07-28T06:33:34.000Z'),
          status: 'Failing',
          restartCount: 1,
          statusMessage: 'Status_msg_test',
        },
      ],
      totalJobCount: 0,
    },
    {
      created: new Date('2021-07-28T06:33:34.000Z'),
      ended: new Date('2021-07-28T06:33:34.000Z'),
      name: '1234567-job-test',
      started: new Date('2021-07-28T06:33:34.000Z'),
      status: 'Stopped',
      replicaList: [
        {
          name: 'rep-113ds',
          created: new Date('2021-07-28T06:33:34.000Z'),
          status: 'Failing',
          restartCount: 1,
          statusMessage: 'Status_msg_test',
        },
      ],
      totalJobCount: 0,
    },
    {
      created: new Date('2021-07-28T06:33:34.000Z'),
      ended: new Date('2021-07-28T06:33:34.000Z'),
      name: '1234567-job-test',
      started: new Date('2021-07-28T06:33:34.000Z'),
      status: 'Failed',
      replicaList: [
        {
          name: 'rep-113ds',
          created: new Date('2021-07-28T06:33:34.000Z'),
          status: 'Failing',
          restartCount: 1,
          statusMessage: 'Status_msg_test',
        },
      ],
      totalJobCount: 0,
    },
  ],
  subscribe: noop,
  unsubscribe: noop,
};
const test2 = {
  appName: 'some_app_name',
  envName: 'test-env',
  jobComponentName: 'job-JQERS1',
  scheduledJobList: [
    {
      created: new Date('2021-07-28T06:33:34.000Z'),
      ended: new Date('2021-07-28T06:33:34.000Z'),
      name: 'testing2',
      started: new Date('2021-07-28T06:33:34.000Z'),
      status: 'Waiting', // 'Waiting','Queued',Running','Succeeded','Stopping','Stopped','Failed'
      replicaList: [
        {
          name: 'rep-113ds',
          created: new Date('2021-07-28T06:33:34.000Z'),
          status: 'Failing',
          restartCount: 1,
          statusMessage: 'Status_msg_test',
        },
      ],
      totalJobCount: 0,
    },
  ],
  subscribe: noop,
  unsubscribe: noop,
};
const test3 = {
  appName: 'some_app_name',
  envName: 'test-env',
  jobComponentName: 'job-JQERS1',
  subscribe: noop,
  unsubscribe: noop,
};

const props = [test1, test2, test3];

export default (
  <div style={{ backgroundColor: 'var(--eds_ui_background__default)' }}>
    {props.map((p, i) => (
      <div key={i} className="grid grid--gap-medium">
        <ScheduledJobList {...p} />
        <br />
      </div>
    ))}
  </div>
);
