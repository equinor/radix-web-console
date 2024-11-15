import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import type { FunctionComponent } from 'react';

import { externalUrls } from '../../externalUrls';
import { Alert } from '../alert';
import { ExternalLink } from '../link/external-link';

export const ExternalDnsAliasHelp: FunctionComponent = () => (
  <Alert className="icon">
    <Icon data={info_circle} color="primary" />
    <div>
      <Typography>
        Please refer to guide{' '}
        <ExternalLink href={externalUrls.externalDNSGuide}>
          Configure External DNS Alias
        </ExternalLink>{' '}
        for information about configuration and troubleshooting
      </Typography>
    </div>
  </Alert>
);
