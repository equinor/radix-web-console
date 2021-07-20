import PropTypes from 'prop-types';
import EnvVarModel from '.';

export default Object.freeze({
  currentValue: PropTypes.string,
  origEnvVar: PropTypes.shape(EnvVarModel),
});
