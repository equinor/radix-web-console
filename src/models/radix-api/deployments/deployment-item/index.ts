import * as PropTypes from 'prop-types';

export interface DeploymentItemModel {
  name: string;
  activeFrom: Date;
  activeTo?: Date;
  gitCommitHash?: string;
}

/* PropTypes validation map for DeploymentItemModel */
export const DeploymentItemModelValidationMap: PropTypes.ValidationMap<DeploymentItemModel> =
  {
    name: PropTypes.string.isRequired,
    activeFrom: PropTypes.instanceOf(Date).isRequired,
    activeTo: PropTypes.instanceOf(Date),
    gitCommitHash: PropTypes.string,
  };
