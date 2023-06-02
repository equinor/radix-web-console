import * as PropTypes from 'prop-types';

import { NodeModel, NodeModelValidationMap } from '../node';
import {
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryNormalizedModelValidationMap,
} from '../replica-summary';
import {
  ResourceRequirementsModel,
  ResourceRequirementsModelValidationMap,
} from '../resource-requirements';
import { ProgressStatus } from '../../../progress-status';

export interface ScheduledJobSummaryModel {
  name: string;
  jobId?: string;
  batchName?: string;
  created: Date;
  started?: Date;
  ended?: Date;
  status: ProgressStatus;
  message?: string;
  replicaList?: Array<ReplicaSummaryNormalizedModel>;
  timeLimitSeconds?: number;
  backoffLimit: number;
  resources?: ResourceRequirementsModel;
  node?: NodeModel;
  deploymentName?: string;
  failedCount: number;
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
    timeLimitSeconds: PropTypes.number,
    backoffLimit: PropTypes.number.isRequired,
    replicaList: PropTypes.arrayOf(
      PropTypes.shape(
        ReplicaSummaryNormalizedModelValidationMap
      ) as PropTypes.Validator<ReplicaSummaryNormalizedModel>
    ),
    resources: PropTypes.shape(ResourceRequirementsModelValidationMap),
    node: PropTypes.shape(NodeModelValidationMap),
    deploymentName: PropTypes.string,
    failedCount: PropTypes.number,
  };
