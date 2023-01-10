import { Popover, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import {
  AzureIdentityModel,
  AzureIdentityModelValidationMap,
} from '../../models/azure-identity';

import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/component';
import {
  DeploymentModel,
  DeploymentModelValidationMap,
} from '../../models/deployment';
import { configVariables } from '../../utils/config';
import { AzureIdentity } from '../identity/azure-identity';

interface AzureIdentityLinkProps {
  namespace: string;
  azure: AzureIdentityModel;
}

const AzureIdentityLink = ({
  namespace,
  azure,
}: AzureIdentityLinkProps): JSX.Element => {
  const popoverRef = useRef<HTMLElement>();
  const [popoverOpen, setPopoverOpen] = useState(false);
  useEffect(() => {
    const handleBodyClick = () => setPopoverOpen(false);
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  return (
    <>
      <Typography
        ref={popoverRef}
        link
        token={{ textDecoration: 'none' }}
        onClick={(ev: SyntheticEvent) => {
          ev.stopPropagation();
          setPopoverOpen(!popoverOpen);
        }}
      >
        Azure
      </Typography>
      <Popover
        open={popoverOpen}
        anchorEl={popoverRef.current}
        onClick={(ev) => ev.stopPropagation()}
      >
        <Popover.Header>
          Azure Federated Credentials Configuration
        </Popover.Header>
        <Popover.Content>
          <AzureIdentity
            oidcIssuerUrl={configVariables.CLUSTER_OIDC_ISSUER_URL}
            clientId={azure.clientId}
            namespace={namespace}
            serviceAccountName={azure.serviceAccountName}
          />
        </Popover.Content>
      </Popover>
    </>
  );
};

AzureIdentityLink.propTypes = {
  namespace: PropTypes.string.isRequired,
  azure: PropTypes.shape(AzureIdentityModelValidationMap).isRequired,
} as PropTypes.ValidationMap<ComponentIdentityProps>;

export interface ComponentIdentityProps {
  component: ComponentModel;
  deployment: DeploymentModel;
}

export const ComponentIdentity = ({
  component,
  deployment,
}: ComponentIdentityProps): JSX.Element => (
  <>
    {component.identity && (
      <>
        <Typography as="span">
          Identity enabled for{' '}
          {component.identity.azure && (
            <AzureIdentityLink
              namespace={deployment.namespace}
              azure={component.identity.azure}
            />
          )}
        </Typography>
      </>
    )}
  </>
);

ComponentIdentity.propTypes = {
  component: PropTypes.shape(ComponentModelValidationMap).isRequired,
  deployment: PropTypes.shape(DeploymentModelValidationMap).isRequired,
} as PropTypes.ValidationMap<ComponentIdentityProps>;
