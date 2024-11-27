import { Typography } from '@equinor/eds-core-react';
import { isNil } from 'lodash-es';
import type { ImageWithLastScan } from '../../store/scan-api';
import { RelativeToNow } from '../time/relative-to-now';
import { VulnerabilityDetails } from '../vulnerability-details';

function getScanStatus(x: boolean): string {
  return isNil(x) ? 'not performed' : ['failed', 'succeeded'][+x];
}

type Props = {
  scan: ImageWithLastScan;
};
export const ComponentScanDetails = ({
  scan: { baseImage, scanSuccess, scanTime, vulnerabilities },
}: Props) => (
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
