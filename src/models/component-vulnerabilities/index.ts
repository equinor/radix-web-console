import * as PropTypes from 'prop-types';
import {
  VulnerabilityModel,
  VulnerabilityModelValidationMap,
} from '../vulnerability';

export interface ComponentVulnerabilitiesModel {
  baseImage: string;
  vulnerabilities?: Array<VulnerabilityModel>;
}

/* PropTypes validation map for ComponentVulnerabilitiesModel */
export const ComponentVulnerabilitiesModelValidationMap: PropTypes.ValidationMap<ComponentVulnerabilitiesModel> =
  {
    baseImage: PropTypes.string.isRequired,
    vulnerabilities: PropTypes.arrayOf(
      PropTypes.shape(
        VulnerabilityModelValidationMap
      ) as PropTypes.Requireable<VulnerabilityModel>
    ),
  };
