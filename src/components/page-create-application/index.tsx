import {
  Accordion,
  Button,
  Checkbox,
  Icon,
  List,
  Typography,
} from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';
import { ConfigureApplicationGithub } from '../configure-application-github';
import { ScrimPopup } from '../scrim-popup';

import {
  type ApplicationRegistration,
  type DeployKeyAndSecret,
  type RegenerateDeployKeyApiArg,
  type RegenerateDeployKeyApiResponse,
  type RegisterApplicationApiArg,
  type RegisterApplicationApiResponse,
  radixApi,
  useGetDeployKeyAndSecretQuery,
  useRegenerateDeployKeyMutation,
  useRegisterApplicationMutation,
} from '../../store/radix-api';
import { NewApplyConfigPipelineLink } from '../link/apply-config-pipeline-link';
import './style.css';
import { externalUrls } from '../../externalUrls';
import { pollingInterval } from '../../store/defaults';
import { configVariables } from '../../utils/config';
import { CompactCopyButton } from '../compact-copy-button';
import imageWebhook from '../configure-application-github/webhook02.png';
import { ExternalLink } from '../link/external-link';
import { CreateApplicationForm } from './create-application-form';
const radixZoneDNS = configVariables.RADIX_CLUSTER_BASE;

export default function PageCreateApplication() {
  const [refreshApps] = radixApi.endpoints.showApplications.useLazyQuery({});
  const [createApp] = useRegisterApplicationMutation();
  const [regenerateSecrets] = useRegenerateDeployKeyMutation();
  const [useGithub, setUseGithub] = useState<boolean>(false);
  const [appName, setAppName] = useState<string>();

  const { data: secrets, refetch: refetchSecrets } =
    useGetDeployKeyAndSecretQuery(
      { appName: appName! },
      { pollingInterval, skip: !useGithub || !appName }
    );

  return (
    <PageCreateApplicationLayout
      useGithub={useGithub}
      setUseGithub={setUseGithub}
      secrets={secrets}
      onRefreshSecrets={refetchSecrets}
      onRegenerateSecrets={(data) => regenerateSecrets(data).unwrap()}
      onRefreshApps={() => refreshApps({})}
      onCreateApp={async (data: RegisterApplicationApiArg) => {
        const response = await createApp(data).unwrap();
        setAppName(
          data.applicationRegistrationRequest?.applicationRegistration?.name
        );
        return response;
      }}
    />
  );
}

type PageCreateApplicationLayoutProps = {
  useGithub: boolean;
  setUseGithub: (show: boolean) => unknown;
  secrets?: DeployKeyAndSecret;
  onRefreshApps: () => unknown;
  onCreateApp: (
    data: RegisterApplicationApiArg
  ) => Promise<RegisterApplicationApiResponse>;
  onRegenerateSecrets: (
    data: RegenerateDeployKeyApiArg
  ) => Promise<RegenerateDeployKeyApiResponse>;
  onRefreshSecrets: () => Promise<unknown>;
};

export function PageCreateApplicationLayout({
  useGithub,
  setUseGithub,
  secrets,
  onRefreshApps,
  onCreateApp,
  onRegenerateSecrets,
  onRefreshSecrets,
}: PageCreateApplicationLayoutProps) {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [registration, setRegistration] =
    useState<ApplicationRegistration | null>(null);

  const onCloseScrim = () => {
    setVisibleScrim(false);
    setRegistration(null);
  };

  const onCreated = (newRegistration: ApplicationRegistration) => {
    containerRef.current?.scrollTo(0, 0);
    setRegistration(newRegistration);
    onRefreshApps();
  };

  return (
    <>
      <Button
        className="action--justify-end"
        variant="ghost"
        color="primary"
        onClick={() => setVisibleScrim(true)}
      >
        <Icon data={add} />
        Create new app
      </Button>
      <ScrimPopup
        title="Create new app"
        open={visibleScrim}
        onClose={onCloseScrim}
      >
        <div className="create-app-content" ref={containerRef}>
          {!registration ? (
            <CreateApplicationForm
              onCreated={onCreated}
              onCreateApp={onCreateApp}
            />
          ) : (
            <div className="grid grid--gap-medium">
              <Typography>
                The application <strong>{registration.name}</strong> has been
                set up
              </Typography>
              <ConfigureApplicationGithub
                refetch={() => console.error('Implement refetch registration!')}
                secrets={secrets}
                onRegenerateSecrets={onRegenerateSecrets}
                onRefreshSecrets={onRefreshSecrets}
                app={registration}
                startVisible
              />

              <fieldset className="check-input">
                <Checkbox
                  name="deployOnly"
                  checked={useGithub}
                  onChange={(e) => setUseGithub(e.target.checked)}
                />{' '}
                <span className="grid grid--gap-small">
                  <Typography
                    className="label"
                    group="input"
                    variant="text"
                    token={{ color: 'currentColor' }}
                  >
                    Use other CI tool than Radix
                  </Typography>
                  <Typography token={{ color: 'currentColor' }}>
                    Select this option if your project is hosted on multiple
                    repositories and/or requires external control of building.
                    Radix will no longer need a webhook and will instead deploy
                    your app through the API/CLI. Read the{' '}
                    <ExternalLink href={externalUrls.deployOnlyGuide}>
                      Deployment Guide
                    </ExternalLink>{' '}
                    for details.
                  </Typography>
                </span>
              </fieldset>

              {!useGithub && (
                <Accordion className="accordion" chevronPosition="right">
                  <Accordion.Item isExpanded={true}>
                    <Accordion.Header>
                      <Accordion.HeaderTitle>
                        <Typography>Add webhook</Typography>
                      </Accordion.HeaderTitle>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="grid grid--gap-medium">
                        <Typography>
                          GitHub notifies Radix using a webhook whenever a code
                          push is made. Open the{' '}
                          <ExternalLink
                            href={`${registration.repository}/settings/hooks/new`}
                          >
                            Add Webhook page
                          </ExternalLink>{' '}
                          and follow the steps below
                        </Typography>
                        <div className="grid grid--gap-medium o-body-text">
                          <img
                            alt="'Add webhook' steps on GitHub"
                            src={imageWebhook}
                            srcSet={`${imageWebhook} 2x`}
                          />
                          <List variant="numbered">
                            <List.Item>
                              As Payload URL, use{' '}
                              <code>{`https://webhook.${radixZoneDNS}/events/github?appName=${registration.name}`}</code>{' '}
                              <CompactCopyButton
                                content={`https://webhook.${radixZoneDNS}/events/github?appName=${registration.name}`}
                              />
                            </List.Item>
                            <List.Item>
                              Choose <code>application/json</code> as Content
                              type
                            </List.Item>
                            <List.Item>
                              The Shared Secret for this application is{' '}
                              <code>{secrets?.sharedSecret}</code>{' '}
                              <CompactCopyButton
                                content={secrets?.sharedSecret ?? ''}
                              />
                            </List.Item>
                            <List.Item>Press "Add webhook"</List.Item>
                          </List>
                        </div>
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              )}
              <Typography>
                Now you can run the{' '}
                <NewApplyConfigPipelineLink appName={registration.name}>
                  apply-config pipeline job
                </NewApplyConfigPipelineLink>
                to apply radixconfig.yaml, or go to{' '}
                <Typography
                  as={Link}
                  to={routeWithParams(routes.app, {
                    appName: registration.name,
                  })}
                  link
                >
                  your application's page
                </Typography>
              </Typography>
            </div>
          )}
        </div>
      </ScrimPopup>
    </>
  );
}
