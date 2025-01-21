import {
  Button,
  Checkbox,
  Divider,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
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
  radixApi,
  useGetDeployKeyAndSecretQuery,
  useRegisterApplicationMutation,
} from '../../store/radix-api';
import { NewApplyConfigPipelineLink } from '../link/apply-config-pipeline-link';
import './style.css';
import useLocalStorage from '../../effects/use-local-storage';
import { externalUrls } from '../../externalUrls';
import { pollingInterval } from '../../store/defaults';
import { ExternalLink } from '../link/external-link';
import { CreateApplicationForm } from './create-application-form';

export default function PageCreateApplication() {
  const [refreshApps] = radixApi.endpoints.showApplications.useLazyQuery({});
  const [createApp] = useRegisterApplicationMutation();
  const [appName, setAppName] = useState<string>();

  const { data: secrets } = useGetDeployKeyAndSecretQuery(
    { appName: appName! },
    { pollingInterval, skip: !appName }
  );

  const onCreateApplication = async (
    applicationRegistration: ApplicationRegistration,
    acknowledgeWarnings: boolean
  ) => {
    const response = await createApp({
      applicationRegistrationRequest: {
        applicationRegistration,
        acknowledgeWarnings,
      },
    }).unwrap();

    if (response.applicationRegistration) {
      setAppName(response.applicationRegistration.name);
    }

    return response.warnings ?? [];
  };

  return (
    <PageCreateApplicationLayout
      secrets={secrets}
      onCreateApplication={onCreateApplication}
      onRefreshApps={() => refreshApps({})}
    />
  );
}

type PageCreateApplicationLayoutProps = {
  secrets?: DeployKeyAndSecret;
  onRefreshApps: () => unknown;
  onCreateApplication: (
    application: ApplicationRegistration,
    acknowledgeWarnings: boolean
  ) => Promise<string[]>;
};

export function PageCreateApplicationLayout({
  secrets,
  onRefreshApps,
  onCreateApplication,
}: PageCreateApplicationLayoutProps) {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const [useGithub, setUseGithub] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [registration, setRegistration] = useState<ApplicationRegistration>();
  const [page, setNewPage] = useCurrentPage();

  const onCloseScrim = () => {
    setVisibleScrim(false);
    setRegistration(undefined);
  };

  const [knownAppNames, setKnownAppNames] = useLocalStorage<Array<string>>(
    'knownApplications',
    []
  );

  const addAppNameToLocalStorage = (appName: string) => {
    if (knownAppNames.some((knownAppName) => knownAppName === appName)) {
      return;
    }
    setKnownAppNames([...knownAppNames, appName].sort());
  };

  const onLocalCreateApplication = async (
    newRegistration: ApplicationRegistration,
    acknowledgeWarnings: boolean
  ) => {
    const warnings = await onCreateApplication(
      newRegistration,
      acknowledgeWarnings
    );
    if (warnings.length > 0) {
      return warnings;
    }
    addAppNameToLocalStorage(newRegistration.name);
    containerRef.current?.scrollTo(0, 0);
    setRegistration(newRegistration);
    onRefreshApps();
    setNewPage('deploykey');
    return [];
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
              registration={registration}
              onCreate={onLocalCreateApplication}
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
              <Divider />
              <ConfigureApplicationGithub
                secrets={secrets}
                app={registration}
              />
              <Divider style={{ width: '100%' }} />
              <Button onClick={() => setNewPage('ci')}>Configure CI</Button>
            </>
          )}

          {page === 'ci' && registration && (
            <>
              <label htmlFor={'deployOnly'} className="check-input">
                <Checkbox
                  id={'deployOnly'}
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
                    Use Radix for CI (build)
                  </Typography>
                  <Typography token={{ color: 'currentColor' }}>
                    Unselect this option if your project is hosted on multiple
                    repositories and/or requires external control of building.
                    Radix will no longer need a webhook and will instead deploy
                    your app through the API/CLI. Read the{' '}
                    <ExternalLink href={externalUrls.deployOnlyGuide}>
                      Deployment Guide
                    </ExternalLink>{' '}
                    for details.
                  </Typography>
                </span>
              </label>
              <Divider style={{ width: '100%' }} />
              {useGithub ? (
                <Button onClick={() => setNewPage('webhook')}>
                  Configure Webhook
                </Button>
              ) : (
                <Button onClick={() => setNewPage('finished')}>Complete</Button>
              )}
            </>
          )}

          {page === 'webhook' && registration && (
            <>
              <ConfigureGithubWebhook
                appName={registration.name}
                repository={registration.repository}
                sharedSecret={secrets?.sharedSecret}
              />
              <Divider style={{ width: '100%' }} />
              <Button onClick={() => setNewPage('finished')}>Complete</Button>
            </>
          )}

          {page === 'finished' && registration && (
            <>
              <Typography>
                Now you can run the <em>apply-config</em> pipeline job, or or go
                to{' '}
                <Typography
                  as={Link}
                  to={routeWithParams(routes.app, {
                    appName: registration.name,
                  })}
                  link
                >
                  your application's page
                </Typography>
                <Divider />
                <NewApplyConfigPipelineLink button appName={registration.name}>
                  Apply Config
                </NewApplyConfigPipelineLink>
              </Typography>
            </>
          )}
        </div>
      </ScrimPopup>
    </>
  );
}

type Page = 'registration' | 'deploykey' | 'ci' | 'webhook' | 'finished';
function useCurrentPage(): [Page, (newPage: Page) => unknown] {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 'registration';

  const onNewPage = (newPage: Page) => {
    setSearchParams((prev) => {
      prev.set('page', newPage);
      return prev;
    });
  };

  return [page as Page, onNewPage];
}
