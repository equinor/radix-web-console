import { PipelineRunTasks } from '.';

import { PipelineRunTaskModel } from '../../models/pipeline-run-task';
import { ProgressStatus } from '../../models/progress-status';

const testData: PipelineRunTaskModel[] = [
  {
    name: 'some-pipeline-run-task',
    realName: 'radix-task-20220510010101-abcde-dev-abcde-some-zxcv',
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
    realName: '',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    name: '',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Succeeded,
  },
  {
    name: undefined,
    status: undefined,
  },
];

export default (
  <div style={{ backgroundColor: 'var(--color-bright)' }}>
    <PipelineRunTasks pipelineRunTasks={testData} />
    <div style={{ height: '100px' }} />
    <PipelineRunTasks pipelineRunTasks={[]} />
  </div>
);
