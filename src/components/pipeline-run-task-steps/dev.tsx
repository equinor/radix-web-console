import { PipelineRunTaskSteps } from '.';

import { ProgressStatus } from '../../models/progress-status';
import { PipelineRunTaskStepModel } from '../../models/radix-api/jobs/pipeline-run-task-step';

const testData: PipelineRunTaskStepModel[] = [
  {
    name: 'some-pipeline-run-task',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    name: 'some-pipeline-run-task',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Queued,
  },
  {
    name: 'some-pipeline-run-task',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    name: 'some-pipeline-run-task',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Succeeded,
  },
  {
    name: 'some-pipeline-run-task',
    status: undefined,
  },
];

export default (
  <div style={{ backgroundColor: 'var(--color-bright)' }}>
    <PipelineRunTaskSteps steps={testData} />
    <div style={{ height: '100px' }} />
    <PipelineRunTaskSteps steps={[]} />
  </div>
);
