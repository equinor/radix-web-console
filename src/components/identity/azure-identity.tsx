import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { Alert } from '../alert';
import { CompactCopyButton } from '../compact-copy-button';
import { externalUrls } from '../../externalUrls';

export interface AzureIdentityProps {
  oidcIssuerUrl: string;
  namespace: string;
  serviceAccountName: string;
  clientId: string;
}

const WorkloadIdentityHelp: FunctionComponent = () => (
  <Alert className="icon">
    <Icon data={info_circle} color="primary" />
    <div>
      <Typography as="span">
        Please refer to guide{' '}
        <Typography
          link
          href={externalUrls.workloadIdentityGuide}
          rel="noopener noreferrer"
          target="_blank"
        >
          Configure Workload Identity
        </Typography>{' '}
        for information about configuration and troubleshooting
      </Typography>
    </div>
  </Alert>
);

export const AzureIdentity: FunctionComponent<AzureIdentityProps> = ({
  oidcIssuerUrl,
  namespace,
  serviceAccountName,
  clientId,
}) => (
  <div className="grid grid--gap-medium">
    <div className="grid grid--gap-small">
      <div>
        <Typography group="input" variant="label">
          Client ID (Managed Identity or App Registration)
        </Typography>
        <div>
          <Typography as="span">{clientId}</Typography>
          <CompactCopyButton content={clientId} size={14} />
        </div>
      </div>
      <div>
        <Typography group="input" variant="label">
          Cluster Issuer URL
        </Typography>
        <div>
          <Typography as="span">{oidcIssuerUrl}</Typography>
          <CompactCopyButton content={oidcIssuerUrl} size={14} />
        </div>
      </div>
      <div>
        <Typography group="input" variant="label">
          Namespace
        </Typography>
        <div>
          <Typography as="span">{namespace}</Typography>
          <CompactCopyButton content={namespace} size={14} />
        </div>
      </div>
      <div>
        <Typography group="input" variant="label">
          Service Account Name
        </Typography>
        <div>
          <Typography as="span">{serviceAccountName}</Typography>
          <CompactCopyButton content={serviceAccountName} size={14} />
        </div>
      </div>
    </div>
    <WorkloadIdentityHelp />
  </div>
);

AzureIdentity.propTypes = {
  oidcIssuerUrl: PropTypes.string.isRequired,
  namespace: PropTypes.string.isRequired,
  serviceAccountName: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
};
