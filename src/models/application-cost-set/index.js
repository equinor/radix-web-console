import PropTypes from 'prop-types';
import ApplicationCost from '../application-cost';

export default Object.freeze({
  applicationCosts: PropTypes.arrayOf(PropTypes.shape(ApplicationCost))
    .isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  totalRequestedCpu: PropTypes.number,
  totalRequestedMemory: PropTypes.number,
});
