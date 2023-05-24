import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { RelativeToNow } from '../time/relative-to-now';
import { VulnerabilityDetails } from '../vulnerability-details';
import {
  ComponentScanModel,
  ComponentScanModelValidationMap,
} from '../../models/component-scan';
import { isNullOrUndefined } from '../../utils/object';

export interface ComponentVulnerabilityDetailsProps {
  scan: ComponentScanModel;
}

function getScanStatus(x?: boolean): string {
  return isNullOrUndefined(x) ? 'not performed' : ['failed', 'succeeded'][+!!x];
}

export const ComponentScanDetails: {
  (props: ComponentVulnerabilityDetailsProps): JSX.Element;
  propTypes: Required<
    PropTypes.ValidationMap<ComponentVulnerabilityDetailsProps>
  >;
} = ({ scan: { baseImage, scanSuccess, scanTime, vulnerabilities } }) => (
  <div className="grid grid--gap-large">
    <div className="grid grid--gap-medium">
      <Typography>
        Base Image <strong>{baseImage || 'N/A'}</strong>
      </Typography>

      <Typography>
        Scan {getScanStatus(scanSuccess)}{' '}
        {!isNullOrUndefined(scanSuccess) && (
          <strong>
            <RelativeToNow time={scanTime} />
          </strong>
        )}
      </Typography>
    </div>

    <div className="grid grid--gap-medium">
      <VulnerabilityDetails vulnerabilities={vulnerabilities} />
    </div>
  </div>
);

ComponentScanDetails.propTypes = {
  scan: PropTypes.shape<PropTypes.ValidationMap<ComponentScanModel>>(
    ComponentScanModelValidationMap
  ).isRequired as PropTypes.Validator<ComponentScanModel>,
};
