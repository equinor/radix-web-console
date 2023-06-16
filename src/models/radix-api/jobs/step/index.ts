import * as PropTypes from 'prop-types';

import { RadixJobCondition } from '../radix-job-condition';

export interface StepModel {
  name: string;
  status: RadixJobCondition;
  started?: Date;
  ended?: Date;
  podName?: string;
  components?: Array<string>;
}

/* PropTypes validation map for StepModel */
export const StepModelValidationMap: PropTypes.ValidationMap<StepModel> = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(RadixJobCondition)).isRequired,
  started: PropTypes.instanceOf(Date),
  ended: PropTypes.instanceOf(Date),
  podName: PropTypes.string,
  components: PropTypes.arrayOf(PropTypes.string),
};
