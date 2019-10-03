import PropTypes from 'prop-types';

import PortModel from '../port';
import ReplicaSummaryModel from '../replica-summary';

export default Object.freeze({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string,
  ports: PropTypes.arrayOf(PropTypes.exact(PortModel)),
  replicaList: PropTypes.arrayOf(PropTypes.exact(ReplicaSummaryModel)),
  secrets: PropTypes.arrayOf(PropTypes.string),
  variables: PropTypes.objectOf(PropTypes.string),
});
