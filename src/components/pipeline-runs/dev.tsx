import { Divider, Typography } from '@equinor/eds-core-react';
import { type ComponentProps, Fragment } from 'react';

import { PipelineRuns } from '.';

const testData: Array<{
  description: string;
  data: ComponentProps<typeof PipelineRuns>;
}> = [
  {
    description: 'PipelineRun - succeeded',
    data: {
      appName: 'MyApp',
      jobName: 'PipelineJobABC',
      pipelineRuns: [
        {
          name: 'some-pipeline-run',
          env: 'dev',
          kubeName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
          started: new Date('2022-05-10T14:31:23Z').toISOString(),
          ended: new Date().toISOString(),
          status: 'Succeeded',
        },
        {
          name: 'some-pipeline-run',
          env: 'dev',
          kubeName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
          started: new Date('2022-05-10T14:31:23Z').toISOString(),
          status: 'Started',
        },
        {
          name: 'some-pipeline-run',
          env: 'dev',
          kubeName: '',
          started: new Date('2022-05-10T14:31:23Z').toISOString(),
          ended: new Date().toISOString(),
          status: 'Succeeded',
        },
        {
          name: 'some-pipeline-run',
          env: 'dev',
          kubeName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
          started: new Date('2022-05-10T14:31:23Z').toISOString(),
          status: 'Running',
        },
        {
          name: 'some-pipeline-run',
          env: 'dev',
          kubeName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
          started: new Date('2022-05-10T14:31:23Z').toISOString(),
          ended: new Date('2022-05-10T14:32:31Z').toISOString(),
          status: 'Failed',
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
