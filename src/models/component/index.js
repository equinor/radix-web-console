import PropTypes from 'prop-types';

import PortModel from '../port';
import ReplicaModel from '../replica';

export default Object.freeze({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ports: PropTypes.arrayOf(PropTypes.exact(PortModel)),
  replicaList: PropTypes.arrayOf(PropTypes.exact(ReplicaModel)),
  secrets: PropTypes.arrayOf(PropTypes.string),
  variables: PropTypes.objectOf(PropTypes.string),
});
