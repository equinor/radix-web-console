import { Divider } from '@equinor/eds-core-react';
import { EnvironmentsSummary } from '.';
import type { EnvironmentSummary } from '../../store/radix-api';
import {
  EnvironmentCardLayout,
  type EnvironmentCardLayoutProps,
} from './environment-card';
import { URL_VAR_NAME } from './environment-ingress';

const testData: Array<Array<EnvironmentSummary>> = [
  [
    {
      name: 'qa',
      status: 'Consistent',
      activeDeployment: {
        name: 'qa-hxn4z-ugvhgj0o',
        environment: 'qa',
        activeFrom: '2019-01-11T08:49:44Z',
      },
      branchMapping: 'master',
    },
    {
      name: 'prod',
      status: 'Consistent',
      activeDeployment: {
        name: 'prod-srqer-ffst7fqx',
        environment: 'prod',
        activeFrom: '2019-01-04T06:39:48Z',
      },
      branchMapping: 'release',
    },
    {
      name: 'pr520',
      status: 'Orphan',
      activeDeployment: {
        name: 'pr520-qt1dm-4r9vcdtc',
        environment: 'pr520',
        activeFrom: '2018-12-27T12:26:34Z',
      },
    },
    {
      name: 'master',
      status: 'Pending',
      activeDeployment: {
        name: 'master-db5rw-44kn77up',
        environment: 'master',
        activeFrom: '0',
      },
      branchMapping: 'master',
    },
  ],
  [
    {
      name: 'qa',
      status: 'Consistent',
      activeDeployment: {
        name: 'qa-hxn4z-ugvhgj0o',
        environment: 'qa',
        activeFrom: '2019-01-11T08:49:44Z',
      },
      branchMapping: 'master',
    },
    {
      name: 'prod',
      status: 'Consistent',
      activeDeployment: {
        name: 'prod-srqer-ffst7fqx',
        environment: 'prod',
        activeFrom: '2019-01-04T06:39:48Z',
      },
      branchMapping: 'release',
    },
  ],
  [],
];

export default (
  <>
    <div
      className="grid"
      style={{
        backgroundColor: 'var(--eds_ui_background__default)',
        padding: 'var(--eds_spacing_large)',
      }}
    >
      {testData.map((x, i) => (
        <div key={i}>
          <EnvironmentsSummary
            application={{
              environments: x,
              userIsAdmin: true,
              name: 'any-name',
              registration: {
                adGroups: [],
                adUsers: [],
                configBranch: '',
                creator: '',
                name: '',
                owner: '',
                readerAdGroups: [],
                readerAdUsers: [],
                repository: '',
                sharedSecret: '',
              },
            }}
          />
          {i !== testData.length - 1 && <Divider />}
        </div>
      ))}
      <Divider />

      <div className="environments-summary">
        <TestEnvironmentCards />
      </div>
    </div>
  </>
);

const cards: EnvironmentCardLayoutProps[] = [
  {
    appName: 'test-component',
    env: { name: 'dev', status: 'Consistent' },
    deployment: undefined,
    isLoading: false,
    envScan: { name: 'dev' },
    components: [],
    repository: 'https://github.com/equinor/radix-web-console',
  },
  {
    appName: 'test-component',
    env: { name: 'dev' },
    deployment: { name: 'web', activeFrom: '2020-02-02T12:00:00Z' },
    isLoading: true,
    envScan: undefined,
    components: undefined,
    repository: undefined,
  },
  {
    appName: 'test-component',
    env: { name: 'dev', status: 'Consistent' },
    deployment: {
      name: 'web',
      activeFrom: '2020-02-02T12:00:00Z',
      gitTags: 'abcd1234',
    },
    isLoading: false,
    envScan: undefined,
    components: [
      {
        name: 'web',
        image: 'ghcr.io/test/test:test',
        type: 'component',
        status: 'Consistent',
        variables: {
          [URL_VAR_NAME]: 'test.example.com',
        },
        replicaList: [
          {
            type: 'ComponentReplica',
            name: 'web-abcd-1',
            created: '2020-02-02T12:00:00Z',
            replicaStatus: { status: 'Running' },
          },
        ],
      },
    ],
    repository: 'https://github.com/equinor/radix-web-console',
  },
  {
    appName: 'test-component',
    env: { name: 'dev', status: 'Consistent', branchMapping: 'main' },
    deployment: {
      name: 'web',
      activeFrom: '2020-02-02T12:00:00Z',
    },
    isLoading: true,
    utilization: {
      environments: {
        dev: {
          components: {
            web: {
              replicas: {
                'web-abcd-1': {
                  cpuAverage: 1.0,
                  cpuRequests: 1.0,
                  memoryMaximum: 1000,
                  memoryRequests: 1000,
                },
              },
            },
          },
        },
      },
    },
    envScan: {
      name: 'dev',
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
    },
    components: [
      {
        name: 'web',
        image: 'ghcr.io/test/test:test',
        type: 'component',
        status: 'Reconciling',
        variables: {
          [URL_VAR_NAME]: 'test.example.com',
        },
        replicaList: [
          {
            type: 'ComponentReplica',
            name: 'web-abcd-1',
            created: '2020-02-02T12:00:00Z',
            replicaStatus: { status: 'Failed' },
          },
        ],
      },
    ],
    repository: 'https://github.com/equinor/radix-web-console',
  },
] satisfies EnvironmentCardLayoutProps[];

function TestEnvironmentCards() {
  return cards.map((k, i) => <EnvironmentCardLayout key={i} {...k} />);
}
