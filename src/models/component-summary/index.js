import * as PropTypes from 'prop-types';

import { ComponentType } from '../component-type';

export default Object.freeze({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(ComponentType)).isRequired,
});
