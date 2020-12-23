import PropTypes from 'prop-types';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    'Pending',
    'Failing',
    'Running',
    'Terminated',
    'Starting',
  ]).isRequired,
  statusMessage: PropTypes.string,
});
