import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { isNil } from 'lodash';
import { FunctionComponent } from 'react';

import { RelativeToNow } from '../time/relative-to-now';
import { VulnerabilityDetails } from '../vulnerability-details';
import { ImageWithLastScan } from '../../store/scan-api';

function getScanStatus(x: boolean): string {
  return isNil(x) ? 'not performed' : ['failed', 'succeeded'][+x];
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
        {!isNil(scanSuccess) && (
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
