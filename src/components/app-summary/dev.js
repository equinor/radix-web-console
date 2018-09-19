import React from 'react';
import buildStatuses from '../../state/applications/build-statuses';

import AppSummary from '.';

export default (
  <div>
    <AppSummary
      app={{
        apiVersion: 'radix.equinor.com/v1',
        kind: 'RadixApplication',
        metadata: {
          name: 'A Name',
        },
        spec: {
          environments: [
            {
              name: 'Env 1',
            },
            {
              name: 'Env 2',
            },
            {
              name: 'Env 3',
            },
            {
              name: 'Env 4',
            },
            {
              name: 'Env 5',
            },
          ],
          components: [
            {
              name: 'Component 1',
            },
            {
              name: 'Component 2',
            },
            {
              name: 'Component 3',
            },
          ],
        },
        public: true,
        buildStatus: buildStatuses.IDLE,
        buildTimestamp: '2018-08-03T08:20:39Z',
      }}
    />
    <AppSummary
      app={{
        apiVersion: 'radix.equinor.com/v1',
        kind: 'RadixApplication',
        metadata: {
          name: 'A Name',
        },
        spec: {
          environments: [
            {
              name: 'Env 1',
            },
            {
              name: 'Env 2',
            },
            {
              name: 'Env 3',
            },
          ],
          components: [
            {
              name: 'Component 1',
            },
            {
              name: 'Component 2',
            },
            {
              name: 'Component 3',
            },
            {
              name: 'Component 4',
            },
            {
              name: 'Component 5',
            },
          ],
        },
        public: true,
        buildStatus: buildStatuses.BUILDING,
        buildTimestamp: '2018-08-03T08:20:39Z',
      }}
    />
    <AppSummary
      app={{
        apiVersion: 'radix.equinor.com/v1',
        kind: 'RadixApplication',
        metadata: {
          name: 'A Name',
        },
        spec: {
          environments: [
            {
              name: 'Env 1',
            },
          ],
          components: [
            {
              name: 'Component 1',
            },
            {
              name: 'Component 2',
            },
          ],
        },
        public: true,
        buildStatus: buildStatuses.FAILURE,
        buildTimestamp: '2018-08-03T08:20:39Z',
      }}
    />
    <AppSummary
      app={{
        apiVersion: 'radix.equinor.com/v1',
        kind: 'RadixApplication',
        metadata: {
          name: 'A Name',
        },
        spec: {
          environments: [
            {
              name: 'Env 1',
            },
          ],
          components: [
            {
              name: 'Component 1',
            },
            {
              name: 'Component 2',
            },
          ],
        },
        public: true,
        buildStatus: buildStatuses.SUCCESS,
        buildTimestamp: '2018-08-03T08:20:39Z',
      }}
    />
  </div>
);
