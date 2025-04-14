import { Divider } from '@equinor/eds-core-react';
import { Fragment } from 'react';

import type { Step } from '../../store/radix-api';
import { PipelineRunTaskStepOverview } from './step-overview';

const testData: Array<Step> = [
  {
    name: 'sib-pipeline-step',
    status: 'Succeeded',
    started: '2019-01-21T14:49:22Z',
    ended: '2019-01-21T14:58:00Z',
    subPipelineTaskStep: {
      pipelineName: 'build-pipeline',
      environment: 'dev',
      taskName: 'build-task',
      name: 'build-step',
      kubeName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
      pipelineRunName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
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
          <PipelineRunTaskStepOverview taskStep={data} />
        </div>
        <div>{i < length - 1 && <Divider />}</div>
      </Fragment>
    ))}
  </div>
);
