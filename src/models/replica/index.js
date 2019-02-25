import PropTypes from 'prop-types';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  replicaStatus: PropTypes.object.isRequired,
  statusMesssage: PropTypes.string,
});
