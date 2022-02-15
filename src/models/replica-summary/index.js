import PropTypes from 'prop-types';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  status: PropTypes.oneOf([
    'Pending',
    'Failing',
    'Running',
    'Terminated',
    'Starting',
    'Queued',
    'Succeeded',
  ]).isRequired,
  restartCount: PropTypes.number,
  statusMessage: PropTypes.string,
  image: PropTypes.string,
  imageId: PropTypes.string,
});
