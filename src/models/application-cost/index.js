import PropTypes from 'prop-types';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  wbs: PropTypes.string,
});
