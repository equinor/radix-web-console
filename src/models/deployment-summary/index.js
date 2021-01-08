import PropTypes from 'prop-types';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  environment: PropTypes.string.isRequired,
  activeFrom: PropTypes.instanceOf(Date),
  activeTo: PropTypes.instanceOf(Date),
});
