import * as PropTypes from 'prop-types';

export interface DeploymentSummaryModel {
  name: string;
  environment: string;
  activeFrom?: Date;
  activeTo?: Date;
  commitID?: string;
  pipelineJobType?: string;
  promotedFromEnvironment?: string;
}

/* PropTypes validation map for DeploymentSummaryModel */
export const DeploymentSummaryModelValidationMap: PropTypes.ValidationMap<DeploymentSummaryModel> =
  {
    name: PropTypes.string.isRequired,
    environment: PropTypes.string.isRequired,
    activeFrom: PropTypes.instanceOf(Date),
    activeTo: PropTypes.instanceOf(Date),
    commitID: PropTypes.string,
    pipelineJobType: PropTypes.string,
    promotedFromEnvironment: PropTypes.string,
  };
