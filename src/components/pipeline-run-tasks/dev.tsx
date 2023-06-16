import { Divider, Typography } from '@equinor/eds-core-react';
import { Fragment } from 'react';

import { PipelineRunTasks, PipelineRunTaskListProps } from '.';

import { ProgressStatus } from '../../models/progress-status';

const testData: Array<{ description: string; data: PipelineRunTaskListProps }> =
  [
    {
      description: 'PipelineRun - succeeded',
      data: {
        appName: 'some-app',
        jobName: 'some-job',
        pipelineRun: {
          name: 'some-pipeline-run',
          env: 'dev',
          status: ProgressStatus.Succeeded,
          realName: 'radix-run-20220510010101-abcde-dev-abcde-some-zxcv',
        },
        tasks: [
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
            status: ProgressStatus.Queued,
          },
        ],
      },
    },
    {
      description: 'PipelineRun - no tasks',
      data: {
        appName: 'some-app',
        jobName: 'some-job',
        pipelineRun: {
          name: 'some-pipeline-run',
          env: 'dev',
          status: ProgressStatus.Succeeded,
          realName: 'radix-run-20220510010101-abcde-dev-abcde-some-zxcv',
        },
        tasks: [],
      },
    },
    {
      description: 'PipelineRun - no pipelinerun',
      data: {
        appName: 'some-app',
        jobName: 'some-job',
        tasks: [
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
            status: ProgressStatus.Queued,
          },
        ],
      },
    },
    {
      description: 'PipelineRun - no pipelinerun, no tasks',
      data: {
        appName: 'some-app',
        jobName: 'some-job',
        tasks: [],
      },
    },
  ];

export default (
  <div
    className="grid grid--gap-large"
    style={{
      backgroundColor: 'var(--eds_ui_background__default)',
      padding: 'var(--eds_spacing_large)',
    }}
  >
    {testData.map(({ description, data }, i, { length }) => (
      <Fragment key={i}>
        <Typography variant="body_long_bold">{description}</Typography>
        <div
          className="grid grid--gap-large"
          style={{
            border: 'solid 2px gray',
            borderRadius: 'var(--eds_shape_corners_border_radius)',
            margin: '4px',
            padding: 'var(--eds_spacing_large)',
          }}
        >
          <PipelineRunTasks {...data} />
        </div>
        <div>{i < length - 1 && <Divider />}</div>
      </Fragment>
    ))}
  </div>
);
