import { Divider, Typography } from '@equinor/eds-core-react';
import { Fragment } from 'react';

import { PipelineRuns, PipelineRunsProps } from '.';

import { PipelineRunReason } from '../../models/radix-api/jobs/pipeline-run-reason';

const testData: Array<{ description: string; data: PipelineRunsProps }> = [
  {
    description: 'PipelineRun - succeeded',
    data: {
      appName: 'MyApp',
      jobName: 'PipelineJobABC',
      pipelineRuns: [
        {
          name: 'some-pipeline-run',
          env: 'dev',
          realName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
          started: new Date('2022-05-10T14:31:23Z'),
          ended: new Date(),
          status: PipelineRunReason.Succeeded,
        },
        {
          name: 'some-pipeline-run',
          env: 'dev',
          started: new Date('2022-05-10T14:31:23Z'),
          status: PipelineRunReason.Started,
        },
        {
          name: 'some-pipeline-run',
          env: 'dev',
          realName: '',
          started: new Date('2022-05-10T14:31:23Z'),
          ended: new Date(),
          status: PipelineRunReason.Succeeded,
        },
        {
          name: 'some-pipeline-run',
          env: 'dev',
          started: new Date('2022-05-10T14:31:23Z'),
          status: PipelineRunReason.Running,
        },
        {
          name: 'some-pipeline-run',
          env: 'dev',
          started: new Date('2022-05-10T14:31:23Z'),
          ended: new Date('2022-05-10T14:32:31Z'),
          status: PipelineRunReason.Failed,
          statusMessage: 'failure message',
        },
      ],
    },
  },
  {
    description: 'PipelineRun - no runs',
    data: {
      appName: 'MyApp',
      jobName: 'PipelineJobABC',
      pipelineRuns: [],
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
          <PipelineRuns {...data} />
        </div>
        <div>{i < length - 1 && <Divider />}</div>
      </Fragment>
    ))}
  </div>
);
