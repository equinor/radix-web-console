import { ApplicationModel } from '.';

import { ConfigurationStatus } from '../configuration-status';
import { TestDependencyDataType } from '../model-types';
import { ProgressStatus } from '../progress-status';

export const testData: TestDependencyDataType<ApplicationModel> = [
  {
    __testDescription: 'Application with job',
    name: 'My app',
    owner: 'i_own_this',
    creator: 'i_created_this',
    repository: 'this/is/the/repo',
    environments: [
      {
        name: 'dev',
        status: ConfigurationStatus.Consistent,
        activeDeployment: {
          name: 'a-deployment',
          environment: 'dev',
          activeFrom: new Date('2018-11-19T14:33:23Z'),
        },
      },
    ],
    registration: {
      adGroups: ['Group 1', 'Group 2'],
      name: 'name',
      repository: 'some/path/to/a/repo',
      sharedSecret: 'aSharedSecret',
      owner: 'a-user@equinor.com',
      machineUser: false,
      creator: 'i_made_this',
      configBranch: 'some_config_branch',
      wbs: 'some_id',
    },
    jobs: [
      {
        environments: ['an-environment'],
        name: 'some-job',
        pipeline: 'build-deploy',
        created: new Date('2018-11-19T14:31:23Z'),
        started: new Date('2018-11-19T14:31:23Z'),
        ended: new Date('2018-11-19T14:32:23Z'),
        status: ProgressStatus.Failed,
      },
    ],
  },
];
