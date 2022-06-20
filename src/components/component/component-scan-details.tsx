import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import RelativeToNow from '../time/relative-to-now';
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

export const ComponentScanDetails = ({
  scan,
}: ComponentVulnerabilityDetailsProps): JSX.Element => (
  <div className="grid grid--gap-large">
    <div className="grid grid--gap-medium">
      <Typography>
        Base Image <strong>{scan.baseImage || 'N/A'}</strong>
      </Typography>
      <Typography>
        Scan {getScanStatus(scan.scanSuccess)}{' '}
        {!isNullOrUndefined(scan.scanSuccess) && (
          <strong>
            <RelativeToNow time={scan.scanTime} />
          </strong>
        )}
      </Typography>
    </div>
    <div className="grid grid--gap-medium">
      <VulnerabilityDetails vulnerabilities={scan.vulnerabilities} />
    </div>
  </div>
);

ComponentScanDetails.propTypes = {
  scan: PropTypes.shape(ComponentScanModelValidationMap).isRequired,
} as PropTypes.ValidationMap<ComponentVulnerabilityDetailsProps>;
