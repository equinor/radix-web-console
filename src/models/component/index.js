import * as PropTypes from 'prop-types';

import { ComponentType } from '../component-type';
import { HorizontalScalingSummaryModelValidationMap } from '../horizontal-scaling-summary';
import { OAuthAuxiliaryResourceModel } from '../oauth-auxiliary-resource';
import { PortModelValidationMap } from '../port';
import { ReplicaSummaryNormalizedModelValidationMap } from '../replica-summary';
import { ScheduledJobSummaryModelValidationMap } from '../scheduled-job-summary';

export default Object.freeze({
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(ComponentType)).isRequired,
  status: PropTypes.string.isRequired,
  ports: PropTypes.arrayOf(PropTypes.shape(PortModelValidationMap)),
  schedulerPort: PropTypes.number,
  scheduledJobPayloadPath: PropTypes.string,
  replicaList: PropTypes.arrayOf(
    PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap)
  ),
  scheduledJobList: PropTypes.arrayOf(
    PropTypes.shape(ScheduledJobSummaryModelValidationMap)
  ),
  secrets: PropTypes.arrayOf(PropTypes.string),
  variables: PropTypes.objectOf(PropTypes.string),
  horizontalScalingSummary: PropTypes.shape(
    HorizontalScalingSummaryModelValidationMap
  ),
  oauth2: PropTypes.shape(OAuthAuxiliaryResourceModel),
});
