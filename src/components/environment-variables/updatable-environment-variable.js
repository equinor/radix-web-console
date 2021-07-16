import PropTypes from 'prop-types';
import EnvVarModel from '../../models/environment-variable';

export default Object.freeze({
  name: PropTypes.string,
  value: PropTypes.string,
});
