import { Divider } from '@equinor/eds-core-react';
import { Fragment } from 'react';
import type { PipelineRun as PipelineRinModel } from '../../store/radix-api';

import { PipelineRun } from '.';

const testData: Array<PipelineRinModel> = [
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
];

export default (
  <div
    className="grid grid--gap-large"
    style={{
      backgroundColor: 'var(--eds_ui_background__default)',
      padding: 'var(--eds_spacing_large)',
    }}
  >
    {testData.map((data, i, { length }) => (
      <Fragment key={i}>
        <div
          className="grid grid--gap-large"
          style={{
            border: 'solid 2px gray',
            borderRadius: 'var(--eds_shape_corners_border_radius)',
            margin: '4px',
            padding: 'var(--eds_spacing_large)',
          }}
        >
          <PipelineRun pipelineRun={data} />
        </div>
        <div>{i < length - 1 && <Divider />}</div>
      </Fragment>
    ))}
  </div>
);
