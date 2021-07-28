import PropTypes from 'prop-types';

import VulnerabilitySummary from '../vulnerability-summary';
import ScanStatus from '../scan-status';

export default Object.freeze({
  status: ScanStatus.isRequired,
  reason: PropTypes.string,
  vulnerabilities: PropTypes.exact(VulnerabilitySummary),
});
