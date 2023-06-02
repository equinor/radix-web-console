import * as PropTypes from 'prop-types';

import {
  VulnerabilityModel,
  VulnerabilityModelValidationMap,
} from '../vulnerability';

export interface ComponentScanModel {
  image: string;
  baseImage: string;
  scanSuccess?: boolean;
  scanTime?: Date;
  vulnerabilities?: Array<VulnerabilityModel>;
}

/* PropTypes validation map for ComponentScanModel */
export const ComponentScanModelValidationMap: PropTypes.ValidationMap<ComponentScanModel> =
  {
    image: PropTypes.string.isRequired,
    baseImage: PropTypes.string.isRequired,
    scanSuccess: PropTypes.bool,
    scanTime: PropTypes.instanceOf(Date),
    vulnerabilities: PropTypes.arrayOf(
      PropTypes.shape(
        VulnerabilityModelValidationMap
      ) as PropTypes.Validator<VulnerabilityModel>
    ),
  };
