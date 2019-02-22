import PropTypes from 'prop-types';

import ConfigurationStatus from '../configuration-status/model';

export default Object.freeze({
  component: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: ConfigurationStatus.isRequired,
});
