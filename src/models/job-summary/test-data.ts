import { JobSummaryModel } from '.';
import { ProgressStatus } from '../progress-status';

export const testData: Array<
  JobSummaryModel & {
    __testDescription: string;
    __testIsInvalidSample?: boolean;
  }
> = [
  {
    __testDescription: 'No target deployment',
    commitID: '1234abcdef4321',
    created: new Date('2018-11-19T14:31:23Z'),
    name: 'A Job',
    pipeline: 'build-deploy',
    started: new Date('2018-11-19T14:31:23Z'),
    status: ProgressStatus.Running,
  },
  {
    __testDescription: 'One target deployment',
    commitID: '1234abcdef4321',
    created: new Date('2018-11-19T14:31:23Z'),
    ended: new Date('2018-11-19T14:34:23Z'),
    environments: ['production'],
    name: 'A Job',
    pipeline: 'build-deploy',
    started: new Date('2018-11-19T14:31:23Z'),
    status: ProgressStatus.Succeeded,
  },
];
