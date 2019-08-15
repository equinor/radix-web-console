import PropTypes from 'prop-types';

export default PropTypes.oneOf([
  'Waiting',
  'Queued',
  'Running',
  'Succeeded',
  'Failed',
]);
