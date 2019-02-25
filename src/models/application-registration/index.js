import PropTypes from 'prop-types';

export default Object.freeze({
  adGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  publicKey: PropTypes.string,
  repository: PropTypes.string.isRequired,
  sharedSecret: PropTypes.string.isRequired,
});
