import PropTypes from 'prop-types';
import ReplicaSummaryModel from '../replica-summary';

export const AuxiliaryResourceDeploymentModel = Object.freeze({
  status: PropTypes.string.isRequired,
  replicaList: PropTypes.arrayOf(PropTypes.exact(ReplicaSummaryModel))
    .isRequired,
});
