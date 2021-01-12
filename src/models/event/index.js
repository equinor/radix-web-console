import PropTypes from 'prop-types';
import ObjectState from '../object-state';

export default Object.freeze({
  lastTimestamp: PropTypes.instanceOf(Date).isRequired,
  involvedObjectKind: PropTypes.string.isRequired,
  involvedObjectNamespace: PropTypes.string.isRequired,
  involvedObjectName: PropTypes.string.isRequired,
  involvedObjectState: PropTypes.shape(ObjectState),
  type: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
});
