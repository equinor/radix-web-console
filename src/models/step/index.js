import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../progress-status';
import { ScanModelValidationMap } from '../scan';

export default Object.freeze({
  ended: PropTypes.instanceOf(Date),
  name: PropTypes.string.isRequired,
  started: PropTypes.instanceOf(Date),
  status: PropTypes.oneOf(Object.keys(ProgressStatus)).isRequired,
  components: PropTypes.arrayOf(PropTypes.string),
  scan: PropTypes.shape(ScanModelValidationMap),
});
