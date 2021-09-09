import PropTypes from 'prop-types';

export const ScanStatusEnum = Object.freeze({
  SUCCESS: 'Success',
  MISSING: 'Missing',
});

export default PropTypes.oneOf(Object.values(ScanStatusEnum));
