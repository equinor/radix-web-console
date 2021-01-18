import PropTypes from 'prop-types';

export default Object.freeze({
  ready: PropTypes.bool.isRequired,
  started: PropTypes.bool,
  restartCount: PropTypes.number.isRequired,
});
