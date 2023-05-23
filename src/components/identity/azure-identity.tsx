import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import { Alert } from '../alert';
import { externalUrls } from '../../externalUrls';

export interface AzureIdentityProps {
  oidcIssuerUrl: string;
  namespace: string;
  serviceAccountName: string;
  clientId: string;
}

const WorkloadIdentityHelp = (): JSX.Element => (
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

export const AzureIdentity = ({
  oidcIssuerUrl,
  namespace,
  serviceAccountName,
  clientId,
}: AzureIdentityProps): JSX.Element => (
  <>
    <div className="grid grid--gap-medium">
      <div className="grid grid--gap-small">
        <div>
          <Typography group="input" variant="label">
            Client ID (Managed Identity or App Registration)
          </Typography>
          <Typography>{clientId}</Typography>
        </div>
        <div>
          <Typography group="input" variant="label">
            Cluster Issuer URL
          </Typography>
          <Typography>{oidcIssuerUrl}</Typography>
        </div>
        <div>
          <Typography group="input" variant="label">
            Namespace
          </Typography>
          <Typography>{namespace}</Typography>
        </div>
        <div>
          <Typography group="input" variant="label">
            Service Account Name
          </Typography>
          <Typography>{serviceAccountName}</Typography>
        </div>
      </div>
      <WorkloadIdentityHelp />
    </div>
  </>
);

AzureIdentity.propTypes = {
  oidcIssuerUrl: PropTypes.string.isRequired,
  namespace: PropTypes.string.isRequired,
  serviceAccountName: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<AzureIdentityProps>;
