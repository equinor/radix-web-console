import { PipelineRuns } from '.';

import { PipelineRunModel } from '../../models/pipeline-run';
import { ProgressStatus } from '../../models/progress-status';

const pipelineRuns: PipelineRunModel[] = [
  {
    name: 'some-pipeline-run',
    env: 'dev',
    realName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    name: 'some-pipeline-run',
    env: 'dev',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Queued,
  },
  {
    name: 'some-pipeline-run',
    env: 'dev',
    realName: '',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    name: '',
    env: 'dev',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Succeeded,
  },
  {
    name: undefined,
    env: 'dev',
    status: undefined,
  },
];

export default (
  <div style={{ backgroundColor: 'var(--color-bright)' }}>
    <PipelineRuns
      pipelineRuns={pipelineRuns}
      appName="my-app"
      jobName="pipeline-job-abc"
    />
    <div style={{ height: '100px' }} />
    <PipelineRuns
      pipelineRuns={[]}
      appName="my-app"
      jobName="pipeline-job-abc"
    />
  </div>
);
