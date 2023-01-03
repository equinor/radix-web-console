import * as PropTypes from 'prop-types';
import {
  ComponentSummaryModel,
  ComponentSummaryModelValidationMap,
} from '../component-summary';

interface DeploymentSummaryPipelineJobInfoModel {
  createdByJob?: string;
  pipelineJobType?: string;
  promotedFromEnvironment?: string;
  commitID?: string;
  gitCommitHash?: string;
  gitTags?: string;
}

export interface DeploymentSummaryModel
  extends DeploymentSummaryPipelineJobInfoModel {
  name: string;
  components?: Array<ComponentSummaryModel>;
  environment: string;
  activeFrom: Date;
  activeTo?: Date;
  gitCommitHash?: string;
  gitTags?: string;
}

/* PropTypes validation map for DeploymentSummaryPipelineJobInfoModel */
const DeploymentSummaryPipelineJobInfoModelValidationMap: PropTypes.ValidationMap<DeploymentSummaryPipelineJobInfoModel> =
  {
    createdByJob: PropTypes.string,
    pipelineJobType: PropTypes.string,
    promotedFromEnvironment: PropTypes.string,
    commitID: PropTypes.string,
    gitCommitHash: PropTypes.string,
    gitTags: PropTypes.string,
  };

/* PropTypes validation map for DeploymentSummaryModel */
export const DeploymentSummaryModelValidationMap: PropTypes.ValidationMap<DeploymentSummaryModel> =
  {
    ...DeploymentSummaryPipelineJobInfoModelValidationMap,
    ...{
      name: PropTypes.string.isRequired,
      components: PropTypes.arrayOf(
        PropTypes.shape(
          ComponentSummaryModelValidationMap
        ) as PropTypes.Validator<ComponentSummaryModel>
      ),
      environment: PropTypes.string.isRequired,
      activeFrom: PropTypes.instanceOf(Date).isRequired,
      activeTo: PropTypes.instanceOf(Date),
      gitCommitHash: PropTypes.string,
      gitTags: PropTypes.string,
    },
  };
