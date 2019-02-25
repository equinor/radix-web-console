import PropTypes from 'prop-types';

import PortModel from '../port';
import ReplicaModel from '../replica';

export default Object.freeze({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ports: PropTypes.arrayOf(PropTypes.shape(PortModel)),
  replicas: PropTypes.arrayOf(PropTypes.string),
  replicaList: PropTypes.arrayOf(PropTypes.shape(ReplicaModel)),
  secrets: PropTypes.arrayOf(PropTypes.string),
  variables: PropTypes.objectOf(PropTypes.string),
});
