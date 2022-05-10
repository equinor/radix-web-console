import { PipelineRunSummaryModel } from '.';

import { TestDependencyDataType } from '../model-types';
import { ProgressStatus } from '../progress-status';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<PipelineRunSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'some-pipeline-run',
    realName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    __testDescription: 'Valid partial object',
    name: 'some-pipeline-run',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Queued,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'some-pipeline-run',
    realName: '',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: '',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Succeeded,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    status: undefined,
  },
];
