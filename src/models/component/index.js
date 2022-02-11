import * as PropTypes from 'prop-types';

import { ComponentType } from '../component-type';
import HorizontalScalingSummaryModel from '../horizontal-scaling-summary';
import { OAuthAuxiliaryResourceModel } from '../oauth2-auxiliary-resource';
import PortModel from '../port';
import ReplicaSummaryModel from '../replica-summary';
import ScheduledJobSummaryModel from '../scheduled-job-summary';

export default Object.freeze({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(ComponentType)).isRequired,
  status: PropTypes.string.isRequired,
  ports: PropTypes.arrayOf(PropTypes.exact(PortModel)),
  schedulerPort: PropTypes.number,
  scheduledJobPayloadPath: PropTypes.string,
  replicaList: PropTypes.arrayOf(PropTypes.exact(ReplicaSummaryModel)),
  scheduledJobList: PropTypes.arrayOf(
    PropTypes.exact(ScheduledJobSummaryModel)
  ),
  secrets: PropTypes.arrayOf(PropTypes.string),
  variables: PropTypes.objectOf(PropTypes.string),
  horizontalScalingSummary: PropTypes.exact(HorizontalScalingSummaryModel),
  oauth2: PropTypes.shape(OAuthAuxiliaryResourceModel),
});
