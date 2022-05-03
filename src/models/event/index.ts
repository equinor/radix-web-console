import * as PropTypes from 'prop-types';

import {
  ObjectStateModel,
  ObjectStateModelValidationMap,
} from '../object-state';

export interface EventModel {
  lastTimestamp: Date;
  involvedObjectKind: string;
  involvedObjectNamespace: string;
  involvedObjectName: string;
  involvedObjectState?: ObjectStateModel;
  type: string;
  reason: string;
  message: string;
}

/* PropTypes validation map for EventModel */
export const EventModelValidationMap: PropTypes.ValidationMap<EventModel> = {
  lastTimestamp: PropTypes.instanceOf(Date).isRequired,
  involvedObjectKind: PropTypes.string.isRequired,
  involvedObjectNamespace: PropTypes.string.isRequired,
  involvedObjectName: PropTypes.string.isRequired,
  involvedObjectState: PropTypes.shape(ObjectStateModelValidationMap),
  type: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
