import { PipelineRunTaskStepModel } from '.';

import { PipelineRunStatus } from '../pipeline-run-status';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<PipelineRunTaskStepModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'some-task-step',
    status: PipelineRunStatus.Succeeded,
    statusMessage: 'statusMessage',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
  },
  {
    __testDescription: 'Valid partial object',
    name: 'some-task-step',
    status: PipelineRunStatus.Started,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'some-task-step',
    status: 'PipelineTaskRunStatus.Succeeded' as unknown as PipelineRunStatus,
    statusMessage: 'statusMessage',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: [] as unknown as string,
    status: PipelineRunStatus.Started,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    status: undefined,
  },
];
