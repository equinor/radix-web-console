import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../../../progress-status';

export interface PipelineRunModel {
  name: string;
  env: string;
  realName?: string;
  status: ProgressStatus;
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
    status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
    statusMessage: PropTypes.string,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
  };
