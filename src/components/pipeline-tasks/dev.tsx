import { PipelineTasks } from '.';

import { PipelineTaskSummaryModel } from '../../models/pipeline-task-summary';
import { ProgressStatus } from '../../models/progress-status';

const jobs: PipelineTaskSummaryModel[] = [
  {
    name: 'some-pipeline-run',
    realName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    name: 'some-pipeline-run',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Queued,
  },
  {
    name: 'some-pipeline-run',
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
    <PipelineTasks pipelineTasks={jobs} appName="my-app" />
    <div style={{ height: '100px' }} />
    <PipelineTasks pipelineTasks={[]} appName="my-app" />
  </div>
);
