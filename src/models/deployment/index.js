import PropTypes from 'prop-types';

import { ComponentModelValidationMap } from '../component';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(PropTypes.shape(ComponentModelValidationMap)),
  createdByJob: PropTypes.string.isRequired,
  environment: PropTypes.string.isRequired,
  activeFrom: PropTypes.instanceOf(Date),
  activeTo: PropTypes.instanceOf(Date),
});
