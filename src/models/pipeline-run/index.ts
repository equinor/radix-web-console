import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../progress-status';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../pipeline-run-task';

export interface PipelineRunModel {
  name: string;
  env: string;
  realName?: string;
  started?: Date;
  ended?: Date;
  status?: ProgressStatus;
  statusMessage?: string;
  tasks?: Array<PipelineRunTaskModel>;
}

/* PropTypes validation map for JobTaskModel */
export const PipelineRunModelValidationMap: PropTypes.ValidationMap<PipelineRunModel> =
  {
    name: PropTypes.string.isRequired,
    env: PropTypes.string.isRequired,
    realName: PropTypes.string,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
    status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
    statusMessage: PropTypes.string,
    tasks: PropTypes.arrayOf(
      PropTypes.shape(
        PipelineRunTaskModelValidationMap
      ) as PropTypes.Requireable<PipelineRunTaskModel>
    ),
  };
