import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';

import { Alert } from '../alert';
import { externalUrls } from '../../externalUrls';

export const ExternalDnsAliasHelp = (): React.JSX.Element => (
  <Alert className="icon">
    <Icon data={info_circle} color="primary" />
    <div>
      <Typography>
        Please refer to guide{' '}
        <Typography
          link
          href={externalUrls.externalDNSGuide}
          rel="noopener noreferrer"
          target="_blank"
        >
          Configure External Alias
        </Typography>{' '}
        for information about configuration and troubleshooting
      </Typography>
    </div>
  </Alert>
);
