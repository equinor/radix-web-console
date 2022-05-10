import * as PropTypes from 'prop-types';

import { RadixJobCondition } from '../radix-job-condition';
import { ScanModel, ScanModelValidationMap } from '../scan';

export interface StepModel {
  name: string;
  started?: Date;
  ended?: Date;
  status: RadixJobCondition;
  components: string[];
  scan: ScanModel;
}

export const StepModelValidationMap: PropTypes.ValidationMap<StepModel> = {
  ended: PropTypes.instanceOf(Date),
  name: PropTypes.string.isRequired,
  started: PropTypes.instanceOf(Date),
  status: PropTypes.oneOf(Object.values(RadixJobCondition)).isRequired,
  components: PropTypes.arrayOf(PropTypes.string),
  scan: PropTypes.shape(
    ScanModelValidationMap
  ) as PropTypes.Requireable<ScanModel>,
};
