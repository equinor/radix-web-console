import PropTypes from 'prop-types';
import EnvVarModel from '../../models/environment-variable';

export default Object.freeze({
  currentValue: PropTypes.string,
  origEnvVar: PropTypes.shape(EnvVarModel),
});
