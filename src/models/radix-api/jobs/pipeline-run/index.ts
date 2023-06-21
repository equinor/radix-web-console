import * as PropTypes from 'prop-types';

import { PipelineRunReason } from '../pipeline-run-reason';

export interface PipelineRunModel {
  name: string;
  env: string;
  realName?: string;
  status: PipelineRunReason;
  statusMessage?: string;
  started?: Date;
  ended?: Date;
}

/* PropTypes validation map for PipelineRunModel */
export const PipelineRunModelValidationMap: PropTypes.ValidationMap<PipelineRunModel> =
  {
    name: PropTypes.string.isRequired,
    env: PropTypes.string.isRequired,
    realName: PropTypes.string,
    status: PropTypes.oneOf(Object.values(PipelineRunReason)).isRequired,
    statusMessage: PropTypes.string,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
  };
