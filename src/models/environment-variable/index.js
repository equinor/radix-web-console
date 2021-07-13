import PropTypes from 'prop-types';
import EnvVarMetadataModel from '../environment-variable-metadata';

export default Object.freeze({
  name: PropTypes.string,
  value: PropTypes.string,
  valueMetadata: PropTypes.arrayOf(PropTypes.exact(EnvVarMetadataModel)),
  isRadixVariable: PropTypes.bool,
  isChanged: PropTypes.bool,
});
