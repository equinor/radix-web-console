import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../progress-status';

export interface PipelineRunTaskModel {
  name: string;
  realName: string;
  pipelineRunEnv: string;
  pipelineName: string;
  started?: Date;
  ended?: Date;
  status: ProgressStatus;
  statusMessage?: string;
}

/* PropTypes validation map for PipelineRunTaskSummaryModel */
export const PipelineRunTaskModelValidationMap: PropTypes.ValidationMap<PipelineRunTaskModel> =
  {
    name: PropTypes.string.isRequired,
    realName: PropTypes.string.isRequired,
    pipelineRunEnv: PropTypes.string.isRequired,
    pipelineName: PropTypes.string.isRequired,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
    status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
    statusMessage: PropTypes.string,
  };
