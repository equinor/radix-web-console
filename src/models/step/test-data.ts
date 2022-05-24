import { TestDependencyDataType } from '../model-types';
import { StepModel } from './index';
import { RadixJobCondition } from '../radix-job-condition';
import { ScanStatus } from '../scan-status';

export const testData: TestDependencyDataType<StepModel> = [
  {
    __testDescription: 'Not started',
    name: 'A step',
    status: RadixJobCondition.Waiting,
    components: [],
    scan: { status: ScanStatus.Missing },
  },
  {
    __testDescription: 'Started, not finished',
    name: 'B step',
    started: new Date('2018-11-19T14:31:23Z'),
    components: [],
    status: RadixJobCondition.Running,
    scan: { status: ScanStatus.Missing },
  },
  {
    __testDescription: 'Finished successfully',
    name: 'C step',
    started: new Date('2018-11-19T14:31:23Z'),
    ended: new Date('2018-11-19T14:34:23Z'),
    status: RadixJobCondition.Succeeded,
    components: [],
    scan: { status: ScanStatus.Success },
  },
  {
    __testDescription: 'Finished with failure',
    name: 'D step',
    started: new Date('2018-11-19T14:31:23Z'),
    ended: new Date('2018-11-19T14:34:23Z'),
    status: RadixJobCondition.Failed,
    components: [],
    scan: { status: ScanStatus.Missing },
  },
];

export default testData;
