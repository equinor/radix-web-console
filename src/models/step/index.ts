import * as PropTypes from 'prop-types';

import { RadixJobCondition } from '../radix-job-condition';
import { ScanModel, ScanModelValidationMap } from '../scan';

export interface StepModel {
  name: string;
  started?: Date;
  ended?: Date;
  status: RadixJobCondition;
  components?: Array<string>;
  scan?: ScanModel;
}

/* PropTypes validation map for StepModel */
export const StepModelValidationMap: PropTypes.ValidationMap<StepModel> = {
  name: PropTypes.string.isRequired,
  started: PropTypes.instanceOf(Date),
  ended: PropTypes.instanceOf(Date),
  status: PropTypes.oneOf(Object.values(RadixJobCondition)).isRequired,
  components: PropTypes.arrayOf(PropTypes.string),
  scan: PropTypes.shape(
    ScanModelValidationMap
  ) as PropTypes.Validator<ScanModel>,
};
