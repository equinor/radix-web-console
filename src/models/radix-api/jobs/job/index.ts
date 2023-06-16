import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../progress-status';
import { StepModel, StepModelValidationMap } from '../step';
import {
  ComponentSummaryModel,
  ComponentSummaryModelValidationMap,
} from '../../deployments/component-summary';
import {
  DeploymentSummaryModel,
  DeploymentSummaryModelValidationMap,
} from '../../deployments/deployment-summary';

export interface JobModel {
  name: string;
  branch?: string;
  commitID?: string;
  created: Date;
  triggeredBy?: string;
  started?: Date;
  ended?: Date;
  status: ProgressStatus;
  pipeline: string;
  steps?: Array<StepModel>;
  deployments?: Array<DeploymentSummaryModel>;
  components?: Array<ComponentSummaryModel>;
}

/* PropTypes validation map for JobModel */
export const JobModelValidationMap: PropTypes.ValidationMap<JobModel> = {
  name: PropTypes.string.isRequired,
  branch: PropTypes.string,
  commitID: PropTypes.string,
  created: PropTypes.instanceOf(Date).isRequired,
  triggeredBy: PropTypes.string,
  started: PropTypes.instanceOf(Date),
  ended: PropTypes.instanceOf(Date),
  status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
  pipeline: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape(StepModelValidationMap) as PropTypes.Validator<StepModel>
  ),
  deployments: PropTypes.arrayOf(
    PropTypes.shape(
      DeploymentSummaryModelValidationMap
    ) as PropTypes.Validator<DeploymentSummaryModel>
  ),
  components: PropTypes.arrayOf(
    PropTypes.shape(
      ComponentSummaryModelValidationMap
    ) as PropTypes.Validator<ComponentSummaryModel>
  ),
};
