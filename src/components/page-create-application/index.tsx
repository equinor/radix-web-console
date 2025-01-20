import { Button, Checkbox, Icon, Typography } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';
import {
  ConfigureApplicationGithub,
  ConfigureGithubWebhook,
} from '../configure-application-github';
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
import { ExternalLink } from '../link/external-link';
import { CreateApplicationForm } from './create-application-form';

export default function PageCreateApplication() {
  const [refreshApps] = radixApi.endpoints.showApplications.useLazyQuery({});
  const [createApp] = useRegisterApplicationMutation();
  const [regenerateSecrets] = useRegenerateDeployKeyMutation();
  const [appName, setAppName] = useState<string>();

  const { data: secrets, refetch: refetchSecrets } =
    useGetDeployKeyAndSecretQuery(
      { appName: appName! },
      { pollingInterval, skip: !appName }
    );

  return (
    <PageCreateApplicationLayout
      secrets={secrets}
      onRefreshSecrets={() => refetchSecrets().unwrap()}
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

type Page = 'registration' | 'deploykey' | 'ci' | 'webhook' | 'finished';
function useCurrentPage(): [Page, (newPage: Page) => unknown] {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 'registration';

  const onNewPage = (newPage: Page) => {
    setSearchParams((prev) => {
      console.log({ newPage });
      prev.set('page', newPage);
      return prev;
    });
  };

  return [page as Page, onNewPage];
}

export function PageCreateApplicationLayout({
  secrets,
  onRefreshApps,
  onCreateApp,
  onRegenerateSecrets,
  onRefreshSecrets,
}: PageCreateApplicationLayoutProps) {
  const [visibleScrim, setVisibleScrim] = useState(true);
  const [created, setCreated] = useState(false);
  const [useGithub, setUseGithub] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [registration, setRegistration] =
    useState<ApplicationRegistration | null>(null);
  const [page, setNewPage] = useCurrentPage();

  const onCloseScrim = () => {
    setVisibleScrim(false);
    setRegistration(null);
    setCreated(false);
  };

  const onCreated = (newRegistration: ApplicationRegistration) => {
    containerRef.current?.scrollTo(0, 0);
    setRegistration(newRegistration);
    setCreated(true);
    onRefreshApps();
    setNewPage('deploykey');
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
          {(page === 'registration' || !registration) && (
            <CreateApplicationForm
              created={created}
              onCreated={onCreated}
              onCreateApp={onCreateApp}
            />
          )}
          {page === 'deploykey' && registration && (
            <>
              <Typography>
                The application <strong>{registration.name}</strong> has been
                set up
              </Typography>
              <Typography>
                To integrate with GitHub you must add a deploy key and a webhook
              </Typography>
              <ConfigureApplicationGithub
                secrets={secrets}
                onRegenerateSecrets={onRegenerateSecrets}
                onRefreshSecrets={onRefreshSecrets}
                app={registration}
              />
              <Button onClick={() => setNewPage('registration')}>
                Registration
              </Button>
              <Button onClick={() => setNewPage('ci')}>Next: CI</Button>
            </>
          )}

          {page === 'ci' && registration && (
            <>
              <fieldset className="check-input">
                <Checkbox
                  name="deployOnly"
                  checked={!useGithub}
                  onChange={(e) => setUseGithub(!e.target.checked)}
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
              <Button onClick={() => setNewPage('deploykey')}>
                Previous: Deploykey
              </Button>
              <Button onClick={() => setNewPage('webhook')}>
                Next: Webhook
              </Button>
            </>
          )}

          {page === 'webhook' && registration && (
            <>
              <ConfigureGithubWebhook
                appName={registration.name}
                repository={registration.repository}
                sharedSecret={secrets?.sharedSecret}
              />
              <Button onClick={() => setNewPage('ci')}>Previous: CI</Button>
              <Button onClick={() => setNewPage('finished')}>Finished</Button>
            </>
          )}

          {page === 'webhook' && registration && (
            <>
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
              <Button onClick={() => setNewPage('webhook')}>
                Previous: Webhook
              </Button>
            </>
          )}
        </div>
      </ScrimPopup>
    </>
  );
}
