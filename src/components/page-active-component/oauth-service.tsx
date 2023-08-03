import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import OAuthToolbar from './oauth-toolbar';

import { ReplicaList } from '../replica-list';
import { ComponentStatusBadge } from '../status-badges';
import {
  OAuthAuxiliaryResourceModel,
  OAuthAuxiliaryResourceModelValidationMap,
} from '../../models/radix-api/deployments/oauth-auxiliary-resource';
import { getOAuthReplicaUrl } from '../../utils/routing';

export interface OAuthServiceProps {
  appName: string;
  envName: string;
  componentName: string;
  oauth2?: OAuthAuxiliaryResourceModel;
}

function replicaUrlFuncFactory(
  appName: string,
  envName: string,
  componentName: string
): (replicaName: string) => string {
  return function (replicaName) {
    return getOAuthReplicaUrl(appName, envName, componentName, replicaName);
  };
}

export const OAuthService = ({
  appName,
  envName,
  componentName,
  oauth2,
}: OAuthServiceProps): React.JSX.Element => (
  <>
    {oauth2 && (
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
                  {oauth2.deployment && (
                    <>
                      <Typography>Status</Typography>
                      <ComponentStatusBadge status={oauth2.deployment.status} />
                    </>
                  )}
                </div>
                <span>
                  <OAuthToolbar
                    appName={appName}
                    envName={envName}
                    componentName={componentName}
                    oauth2={oauth2}
                  />
                </span>
              </div>
              <div className="grid">
                {oauth2.deployment?.replicaList?.length > 0 ? (
                  <ReplicaList
                    replicaList={oauth2.deployment.replicaList}
                    replicaUrlFunc={replicaUrlFuncFactory(
                      appName,
                      envName,
                      componentName
                    )}
                  />
                ) : (
                  <Typography>This resource has no replicas</Typography>
                )}
              </div>
            </form>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    )}
  </>
);

OAuthService.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  oauth2: PropTypes.shape(OAuthAuxiliaryResourceModelValidationMap),
} as PropTypes.ValidationMap<OAuthServiceProps>;
