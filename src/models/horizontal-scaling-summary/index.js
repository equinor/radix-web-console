import PropTypes from 'prop-types';

export default Object.freeze({
  minReplicas: PropTypes.number,
  maxReplicas: PropTypes.number,
  currentCPUUtilizationPercentage: PropTypes.number,
  targetCPUUtilizationPercentage: PropTypes.number,
});
