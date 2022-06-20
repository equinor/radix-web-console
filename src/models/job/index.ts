import * as PropTypes from 'prop-types';

import {
  ComponentSummaryModel,
  ComponentSummaryModelValidationMap,
} from '../component-summary';
import {
  DeploymentSummaryModel,
  DeploymentSummaryModelValidationMap,
} from '../deployment-summary';
import { ProgressStatus } from '../progress-status';
import { StepModel, StepModelValidationMap } from '../step';

export interface JobModel {
  name: string;
  pipeline: string;
  status: ProgressStatus;
  created: Date;
  started?: Date;
  ended?: Date;
  commitID?: string;
  triggeredBy?: string;
  components?: Array<ComponentSummaryModel>;
  deployments?: Array<DeploymentSummaryModel>;
  steps?: Array<StepModel>;
}

/* PropTypes validation map for JobModel */
export const JobModelValidationMap: PropTypes.ValidationMap<JobModel> = {
  name: PropTypes.string.isRequired,
  pipeline: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  started: PropTypes.instanceOf(Date),
  ended: PropTypes.instanceOf(Date),
  commitID: PropTypes.string,
  triggeredBy: PropTypes.string,
  components: PropTypes.arrayOf(
    PropTypes.shape(
      ComponentSummaryModelValidationMap
    ) as PropTypes.Validator<ComponentSummaryModel>
  ),
  deployments: PropTypes.arrayOf(
    PropTypes.shape(
      DeploymentSummaryModelValidationMap
    ) as PropTypes.Validator<DeploymentSummaryModel>
  ),
  steps: PropTypes.arrayOf(
    PropTypes.shape(StepModelValidationMap) as PropTypes.Validator<StepModel>
  ),
};
