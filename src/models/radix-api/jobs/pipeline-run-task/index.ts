import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../../../progress-status';

export interface PipelineRunTaskModel {
  name: string;
  realName: string;
  pipelineRunEnv: string;
  pipelineName: string;
  status: ProgressStatus;
  statusMessage?: string;
  started?: Date;
  ended?: Date;
}

/* PropTypes validation map for PipelineRunTaskSummaryModel */
export const PipelineRunTaskModelValidationMap: PropTypes.ValidationMap<PipelineRunTaskModel> =
  {
    name: PropTypes.string.isRequired,
    realName: PropTypes.string.isRequired,
    pipelineRunEnv: PropTypes.string.isRequired,
    pipelineName: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
    statusMessage: PropTypes.string,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
  };
