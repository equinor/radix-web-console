import * as PropTypes from 'prop-types';
import {
  VulnerabilityModel,
  VulnerabilityModelValidationMap,
} from '../vulnerability';

export interface ComponentVulnerabilitiesModel {
  image: string;
  baseImage: string;
  scanSuccess?: boolean;
  scanTime?: Date;
  vulnerabilities?: Array<VulnerabilityModel>;
}

/* PropTypes validation map for ComponentVulnerabilitiesModel */
export const ComponentVulnerabilitiesModelValidationMap: PropTypes.ValidationMap<ComponentVulnerabilitiesModel> =
  {
    image: PropTypes.string.isRequired,
    baseImage: PropTypes.string.isRequired,
    scanSuccess: PropTypes.bool,
    scanTime: PropTypes.instanceOf(Date),
    vulnerabilities: PropTypes.arrayOf(
      PropTypes.shape(
        VulnerabilityModelValidationMap
      ) as PropTypes.Requireable<VulnerabilityModel>
    ),
  };
