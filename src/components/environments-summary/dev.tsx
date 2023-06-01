import { Divider } from '@equinor/eds-core-react';
import { EnvironmentsSummary } from '.';

import { ConfigurationStatus } from '../../models/radix-api/environments/configuration-status';
import { EnvironmentSummaryModel } from '../../models/radix-api/environments/environment-summary';

const testData: Array<Array<EnvironmentSummaryModel>> = [
  [
    {
      name: 'qa',
      status: ConfigurationStatus.Consistent,
      activeDeployment: {
        name: 'qa-hxn4z-ugvhgj0o',
        environment: 'qa',
        activeFrom: new Date('2019-01-11T08:49:44Z'),
      },
      branchMapping: 'master',
    },
    {
      name: 'prod',
      status: ConfigurationStatus.Consistent,
      activeDeployment: {
        name: 'prod-srqer-ffst7fqx',
        environment: 'prod',
        activeFrom: new Date('2019-01-04T06:39:48Z'),
      },
      branchMapping: 'release',
    },
    {
      name: 'pr520',
      status: ConfigurationStatus.Orphan,
      activeDeployment: {
        name: 'pr520-qt1dm-4r9vcdtc',
        environment: 'pr520',
        activeFrom: new Date('2018-12-27T12:26:34Z'),
      },
    },
    {
      name: 'master',
      status: ConfigurationStatus.Pending,
      activeDeployment: {
        name: 'master-db5rw-44kn77up',
        environment: 'master',
        activeFrom: new Date(0),
      },
      branchMapping: 'master',
    },
  ],
  [
    {
      name: 'qa',
      status: ConfigurationStatus.Consistent,
      activeDeployment: {
        name: 'qa-hxn4z-ugvhgj0o',
        environment: 'qa',
        activeFrom: new Date('2019-01-11T08:49:44Z'),
      },
      branchMapping: 'master',
    },
    {
      name: 'prod',
      status: ConfigurationStatus.Consistent,
      activeDeployment: {
        name: 'prod-srqer-ffst7fqx',
        environment: 'prod',
        activeFrom: new Date('2019-01-04T06:39:48Z'),
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
      <div>
        <EnvironmentsSummary key={i} appName="appName" envs={x} />
        {i !== testData.length - 1 && <Divider />}
      </div>
    ))}
  </div>
);
