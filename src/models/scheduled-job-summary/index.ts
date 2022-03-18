import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../progress-status';
import {
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryNormalizedModelValidationMap,
} from '../replica-summary';

export interface ScheduledJobSummaryModel {
  name: string;
  jobId?: string;
  batchName?: string;
  created: Date;
  started?: Date;
  ended?: Date;
  status: ProgressStatus;
  message: string;
  replicaList?: Array<ReplicaSummaryNormalizedModel>;
}

/* PropTypes validation map for ScheduledJobSummaryModel */
export const ScheduledJobSummaryModelValidationMap: PropTypes.ValidationMap<ScheduledJobSummaryModel> =
  {
    name: PropTypes.string.isRequired,
    jobId: PropTypes.string,
    batchName: PropTypes.string,
    created: PropTypes.instanceOf(Date).isRequired,
    started: PropTypes.instanceOf(Date),
    ended: PropTypes.instanceOf(Date),
    status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
    message: PropTypes.string,
    replicaList: PropTypes.arrayOf(
      PropTypes.shape(
        ReplicaSummaryNormalizedModelValidationMap
      ) as PropTypes.Requireable<ReplicaSummaryNormalizedModel>
    ),
  };
