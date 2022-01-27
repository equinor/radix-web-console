import * as PropTypes from 'prop-types';

export default Object.freeze({
  minReplicas: PropTypes.number.isRequired,
  maxReplicas: PropTypes.number.isRequired,
  currentCPUUtilizationPercentage: PropTypes.number.isRequired,
  targetCPUUtilizationPercentage: PropTypes.number.isRequired,
});
