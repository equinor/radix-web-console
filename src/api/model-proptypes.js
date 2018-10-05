import PropTypes from 'prop-types';

// TODO: auto-generate this from the API server Swagger defs

export const application = PropTypes.exact({
  adGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string,
  publicKey: PropTypes.string,
  repository: PropTypes.string.isRequired,
  sharedSecret: PropTypes.string.isRequired,
});
