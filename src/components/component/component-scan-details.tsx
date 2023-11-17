import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { RelativeToNow } from '../time/relative-to-now';
import { VulnerabilityDetails } from '../vulnerability-details';
import { ImageWithLastScan } from '../../store/scan-api';
import { isNullOrUndefined } from '../../utils/object';

function getScanStatus(x: boolean): string {
  return isNullOrUndefined(x) ? 'not performed' : ['failed', 'succeeded'][+x];
}

export const ComponentScanDetails: FunctionComponent<{
  scan: ImageWithLastScan;
}> = ({ scan: { baseImage, scanSuccess, scanTime, vulnerabilities } }) => (
  <div className="grid grid--gap-large">
    <div className="grid grid--gap-medium">
      <Typography>
        Base Image <strong>{baseImage || 'N/A'}</strong>
      </Typography>

      <Typography>
        Scan {getScanStatus(scanSuccess)}{' '}
        {!isNullOrUndefined(scanSuccess) && (
          <strong>
            <RelativeToNow time={new Date(scanTime)} />
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
  scan: PropTypes.object.isRequired as PropTypes.Validator<ImageWithLastScan>,
};
