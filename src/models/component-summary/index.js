import PropTypes from 'prop-types';
import ComponentType from '../component-type';

export default Object.freeze({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: ComponentType.isRequired,
});
