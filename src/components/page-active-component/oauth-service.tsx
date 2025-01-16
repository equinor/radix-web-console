import { Accordion, Typography } from '@equinor/eds-core-react';
import type { OAuth2AuxiliaryResource } from '../../store/radix-api';
import { getOAuthReplicaUrl } from '../../utils/routing';
import { ReplicaList } from '../replica-list';
import { ComponentStatusBadge } from '../status-badges';
import { OAuthToolbar } from './oauth-toolbar';

type Props = {
  appName: string;
  envName: string;
  componentName: string;
  oauth2: OAuth2AuxiliaryResource;
  refetch: () => unknown;
};
export const OAuthService = ({
  appName,
  envName,
  componentName,
  oauth2,
  refetch,
}: Props) => (
  <Accordion className="accordion elevated" chevronPosition="right">
    <Accordion.Item isExpanded>
      <Accordion.Header>
        <Accordion.HeaderTitle>
          <Typography className="whitespace-nowrap" variant="h4" as="span">
            OAuth2 Service
          </Typography>
        </Accordion.HeaderTitle>
      </Accordion.Header>
      <Accordion.Panel>
        <form className="grid grid--gap-medium">
          <div className="oauth-service-form__title">
            <div className="grid grid--gap-small grid--auto-columns">
              <Typography>Status</Typography>
              <ComponentStatusBadge status={oauth2.deployment.status} />
            </div>
            <span>
              <OAuthToolbar
                appName={appName}
                envName={envName}
                componentName={componentName}
                oauth2={oauth2}
                refetch={refetch}
              />
            </span>
          </div>
          <div className="grid">
            {oauth2.deployment.replicaList &&
            oauth2.deployment.replicaList.length > 0 ? (
              <ReplicaList
                appName={appName}
                envName={envName}
                compName={componentName}
                replicaList={oauth2.deployment.replicaList}
                replicaUrlFunc={(name) =>
                  getOAuthReplicaUrl(appName, envName, componentName, name)
                }
              />
            ) : (
              <Typography>This resource has no replicas</Typography>
            )}
          </div>
        </form>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);
