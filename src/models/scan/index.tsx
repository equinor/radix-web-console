import * as PropTypes from 'prop-types';

import { ScanStatus } from '../scan-status';
import {
  VulnerabilitySummaryModel,
  VulnerabilitySummaryModelValidationMap,
} from '../scan-api/models/vulnerability-summary';

export interface ScanModel {
  status: ScanStatus;
  vulnerabilities?: VulnerabilitySummaryModel;
  reason?: string;
}

/* PropTypes validation map for ScanModel */
export const ScanModelValidationMap: PropTypes.ValidationMap<ScanModel> = {
  status: PropTypes.oneOf(Object.values(ScanStatus)).isRequired,
  reason: PropTypes.string,
  vulnerabilities: PropTypes.shape(VulnerabilitySummaryModelValidationMap),
};
