import { PipelineRunTasks } from '.';

import { ProgressStatus } from '../../models/progress-status';
import { PipelineRunTaskModel } from '../../models/radix-api/jobs/pipeline-run-task';

const testData: PipelineRunTaskModel[] = [
  {
    name: 'some-pipeline-run-task',
    realName: 'radix-task-20220510010101-abcde-dev-abcde-some-zxcv',
    pipelineName: 'build-pipeline',
    pipelineRunEnv: 'dev',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    name: 'some-pipeline-run-task',
    realName: 'radix-task-20220510010101-abcde-dev-abcde-some-zxcv',
    pipelineName: 'build-pipeline',
    pipelineRunEnv: 'dev',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Queued,
  },
  {
    name: 'some-pipeline-run-task',
    realName: '',
    pipelineName: 'build-pipeline',
    pipelineRunEnv: 'dev',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    name: 'some-pipeline-run-task',
    realName: 'radix-task-20220510010101-abcde-dev-abcde-some-zxcv',
    pipelineName: 'build-pipeline',
    pipelineRunEnv: 'dev',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Succeeded,
  },
  {
    name: 'some-pipeline-run-task',
    realName: 'radix-task-20220510010101-abcde-dev-abcde-some-zxcv',
    pipelineName: 'build-pipeline',
    pipelineRunEnv: 'dev',
    status: undefined,
  },
];

export default (
  <div style={{ backgroundColor: 'var(--color-bright)' }}>
    <PipelineRunTasks
      tasks={testData}
      appName={'some-app'}
      jobName={'some-job'}
    />
    <div style={{ height: '100px' }} />
    <PipelineRunTasks tasks={[]} appName={'some-app'} jobName={'some-job'} />
  </div>
);
