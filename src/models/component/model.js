import PropTypes from 'prop-types';

import Port from '../port/model';

export default Object.freeze({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ports: PropTypes.arrayOf(PropTypes.shape(Port)),
  replicas: PropTypes.arrayOf(PropTypes.string),
  secrets: PropTypes.arrayOf(PropTypes.string),
  variables: PropTypes.objectOf(PropTypes.string),
});
