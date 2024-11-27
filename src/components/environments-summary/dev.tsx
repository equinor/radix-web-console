import { Divider } from '@equinor/eds-core-react';
import { EnvironmentsSummary } from '.';

import type { EnvironmentSummary } from '../../store/radix-api';

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
          application={{ environments: x, userIsAdmin: true }}
        />
        {i !== testData.length - 1 && <Divider />}
      </div>
    ))}
  </div>
);
