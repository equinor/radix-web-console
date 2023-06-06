import { PipelineRunTaskModel } from '.';

import { TestDependencyDataType } from '../../../model-types';
import { ProgressStatus } from '../../../progress-status';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<PipelineRunTaskModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'some-task',
    realName: 'tkn-task-dev-abcde-some-zxcv-20220510010101',
    pipelineRunEnv: 'dev',
    pipelineName: 'build-pipeline',
    status: ProgressStatus.Succeeded,
    statusMessage: 'statusMessage',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
  },
  {
    __testDescription: 'Valid partial object',
    name: 'some-task',
    realName: 'tkn-task-dev-abcde-some-zxcv-20220510010101',
    pipelineRunEnv: 'dev',
    pipelineName: 'build-pipeline',
    status: ProgressStatus.Queued,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'some-task',
    realName: [
      'sergey',
      'forgot',
      'to',
      'add',
      'these',
      'tests',
      'to',
      '../test-dependencies.ts',
    ] as unknown as string,
    pipelineRunEnv: 'dev',
    pipelineName: 'build-pipeline',
    status: ProgressStatus.Succeeded,
    statusMessage: 'statusMessage',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: true as unknown as string,
    realName: 'tkn-task-dev-abcde-some-zxcv-20220510010101',
    pipelineRunEnv: 'dev',
    pipelineName: 'build-pipeline',
    status: ProgressStatus.Succeeded,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    realName: undefined,
    pipelineRunEnv: undefined,
    pipelineName: undefined,
    status: undefined,
  },
];
