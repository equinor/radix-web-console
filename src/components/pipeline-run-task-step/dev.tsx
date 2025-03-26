// import { Divider } from '@equinor/eds-core-react';
// import { Fragment } from 'react';
//
// import { PipelineRunTask } from '.';
//
// import type { PipelineRunTask as PipelineRunTaskModel } from '../../store/radix-api';
//
// const testData: Array<PipelineRunTaskModel> = [
//   {
//     name: 'some-pipeline-run',
//     kubeName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
//     pipelineRunEnv: 'dev',
//     pipelineName: 'build-pipeline',
//     status: 'Succeeded',
//     started: new Date('2022-05-10T14:31:23Z').toISOString(),
//     ended: new Date().toISOString(),
//   },
//   {
//     name: 'some-pipeline-run',
//     kubeName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
//     pipelineRunEnv: 'dev',
//     pipelineName: 'build-pipeline',
//     status: 'PipelineRunPending',
//     started: new Date('2022-05-10T14:31:23Z').toISOString(),
//   },
//   {
//     name: 'some-pipeline-run',
//     kubeName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
//     pipelineRunEnv: 'dev',
//     pipelineName: 'build-pipeline',
//     status: 'Succeeded',
//     started: new Date('2022-05-10T14:31:23Z').toISOString(),
//     ended: new Date().toISOString(),
//   },
//   {
//     name: 'some-pipeline-run',
//     kubeName: 'tkn-pipelinerun-dev-abcde-some-zxcv-20220510010101',
//     pipelineRunEnv: 'dev',
//     pipelineName: 'build-pipeline',
//     status: 'Succeeded',
//     started: new Date('2022-05-10T14:31:23Z').toISOString(),
//   },
// ];
//
// export default (
//   <div
//     className="grid grid--gap-large"
//     style={{
//       backgroundColor: 'var(--eds_ui_background__default)',
//       padding: 'var(--eds_spacing_large)',
//     }}
//   >
//     {testData.map((data, i, { length }) => (
//       <Fragment key={i}>
//         <div
//           className="grid grid--gap-large"
//           style={{
//             border: 'solid 2px gray',
//             borderRadius: 'var(--eds_shape_corners_border_radius)',
//             margin: '4px',
//             padding: 'var(--eds_spacing_large)',
//           }}
//         >
//           <PipelineRunTask task={data} />
//         </div>
//         <div>{i < length - 1 && <Divider />}</div>
//       </Fragment>
//     ))}
//   </div>
// );
