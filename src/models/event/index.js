import PropTypes from 'prop-types';

export default Object.freeze({
  lastTimestamp: PropTypes.instanceOf(Date).isRequired,
  involvedObjectKind: PropTypes.string.isRequired,
  involvedObjectNamespace: PropTypes.string.isRequired,
  involvedObjectName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
});
