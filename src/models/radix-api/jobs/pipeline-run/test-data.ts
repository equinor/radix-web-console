import { PipelineRunModel } from '.';

import { PipelineRunReason } from '../pipeline-run-reason';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<PipelineRunModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'some-pipeline-run',
    env: 'dev',
    realName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
    status: PipelineRunReason.Succeeded,
    statusMessage: 'statusMessage',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
  },
  {
    __testDescription: 'Valid partial object',
    name: 'some-pipeline-run',
    env: 'dev',
    started: new Date('2022-05-10T14:31:23Z'),
    status: PipelineRunReason.Started,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    env: 'dev',
    name: 'some-pipeline-run',
    realName: 2 as unknown as string,
    status: PipelineRunReason.Succeeded,
    statusMessage: 'statusMessage',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: { firstName: 'tim', lastName: 'tom' } as unknown as string,
    env: 'dev',
    status: PipelineRunReason.Succeeded,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    env: undefined,
    status: undefined,
  },
];
