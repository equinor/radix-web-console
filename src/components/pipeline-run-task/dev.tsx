import { PipelineRunTask } from './index';

import { ProgressStatus } from '../../models/progress-status';
import { PipelineRunTaskModel } from '../../models/radix-api/jobs/pipeline-run-task';

const testData: Array<PipelineRunTaskModel> = [
  {
    name: 'some-pipeline-run',
    pipelineName: 'build-pipeline',
    pipelineRunEnv: 'dev',
    realName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    name: 'some-pipeline-run',
    realName: undefined,
    pipelineName: 'build-pipeline',
    pipelineRunEnv: 'dev',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Queued,
  },
  {
    name: 'some-pipeline-run',
    pipelineRunEnv: 'dev',
    pipelineName: 'build-pipeline',
    realName: '',
    started: new Date('2022-05-10T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
  },
  {
    name: '',
    realName: undefined,
    pipelineRunEnv: 'dev',
    pipelineName: 'build-pipeline',
    started: new Date('2022-05-10T14:31:23Z'),
    status: ProgressStatus.Succeeded,
  },
  {
    name: undefined,
    realName: undefined,
    pipelineName: 'build-pipeline',
    pipelineRunEnv: 'dev',
    status: undefined,
  },
];

export default (
  <>
    {testData.map((task, i) => (
      <div style={{ backgroundColor: 'var(--color-bright)' }}>
        <PipelineRunTask task={task} />
      </div>
    ))}
  </>
);
