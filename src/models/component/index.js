import PropTypes from 'prop-types';

import PortModel from '../port';
import ReplicaSummaryModel from '../replica-summary';
import ScheduledJobSummaryModel from '../scheduled-job-summary';
import ComponentType from '../component-type';

export default Object.freeze({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: ComponentType.isRequired,
  status: PropTypes.string.isRequired,
  ports: PropTypes.arrayOf(PropTypes.exact(PortModel)),
  schedulerPort: PropTypes.string,
  scheduledJobPayloadPath: PropTypes.string,
  replicaList: PropTypes.arrayOf(PropTypes.exact(ReplicaSummaryModel)),
  scheduledJobList: PropTypes.arrayOf(
    PropTypes.exact(ScheduledJobSummaryModel)
  ),
  secrets: PropTypes.arrayOf(PropTypes.string),
  variables: PropTypes.objectOf(PropTypes.string),
  horizontalScalingSummary: PropTypes.objectOf(PropTypes.number),
});
