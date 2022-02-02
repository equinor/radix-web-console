import * as PropTypes from 'prop-types';

import { RadixJobCondition } from '../radix-job-condition';
import { ScanModelValidationMap } from '../scan';

export default Object.freeze({
  ended: PropTypes.instanceOf(Date),
  name: PropTypes.string.isRequired,
  started: PropTypes.instanceOf(Date),
  status: PropTypes.oneOf(Object.values(RadixJobCondition)).isRequired,
  components: PropTypes.arrayOf(PropTypes.string),
  scan: PropTypes.shape(ScanModelValidationMap),
});
