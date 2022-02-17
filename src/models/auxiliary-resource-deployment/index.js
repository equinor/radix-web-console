import * as PropTypes from 'prop-types';

import { ReplicaSummaryNormalizedModelValidationMap } from '../replica-summary';

export const AuxiliaryResourceDeploymentModel = Object.freeze({
  status: PropTypes.string.isRequired,
  replicaList: PropTypes.arrayOf(
    PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap)
  ).isRequired,
});
