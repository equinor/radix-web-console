import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../progress-status';

export interface PipelineTaskSummaryModel {
  name: string;
  realName?: string;
  started?: Date;
  ended?: Date;
  status?: ProgressStatus;
  statusMessage?: string;
  // steps?: Array<string>;
}

/* PropTypes validation map for PipelineTaskSummaryModel */
export const PipelineTaskSummaryModelValidationMap: PropTypes.ValidationMap<PipelineTaskSummaryModel> =
  {
    name: PropTypes.string.isRequired,
    realName: PropTypes.string,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
    status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
    statusMessage: PropTypes.string,
    // steps: PropTypes.arrayOf(
    //   PropTypes.shape(
    //     ScanModelValidationMap
    //   ) as PropTypes.Requireable<ScanModel>
    // ),
  };
