import PropTypes from 'prop-types';

export default Object.freeze({
  adGroups: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  publicKey: PropTypes.string,
  repository: PropTypes.string.isRequired,
  sharedSecret: PropTypes.string.isRequired,
});
