import * as PropTypes from 'prop-types';

import {
  VulnerabilitySummaryModel,
  VulnerabilitySummaryModelValidationMap,
} from '../vulnerability-summary';
import { ScanStatus } from '../scan-status';

export interface ScanModel {
  status: ScanStatus;
  vulnerabilities: VulnerabilitySummaryModel;
  reason?: string;
}

/* PropTypes validation map for ScanModel */
export const ScanModelValidationMap: PropTypes.ValidationMap<ScanModel> = {
  status: PropTypes.oneOf<any>(Object.keys(ScanStatus)),
  reason: PropTypes.string,
  vulnerabilities: PropTypes.shape(VulnerabilitySummaryModelValidationMap)
    .isRequired,
};
