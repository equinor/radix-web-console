import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import type { FunctionComponent } from 'react';

import { Alert } from '../alert';
import { externalUrls } from '../../externalUrls';

export const ExternalDnsAliasHelp: FunctionComponent = () => (
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
          Configure External DNS Alias
        </Typography>{' '}
        for information about configuration and troubleshooting
      </Typography>
    </div>
  </Alert>
);
