import { Button, Divider, Icon, Typography } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useLocalStorage from '../../effects/use-local-storage';
import { routes } from '../../routes';
import type {
  ApplicationRegistration,
  DeployKeyAndSecret,
} from '../../store/radix-api';
import { routeWithParams } from '../../utils/string';
import { ConfigureGithubDeploykey } from '../configure-application-github/configure-github-deploykey';
import { ConfigureGithubWebhook } from '../configure-application-github/configure-github-webhook';
import { NewApplyConfigPipelineLink } from '../link/apply-config-pipeline-link';
import { ScrimPopup } from '../scrim-popup';
import { CreateApplicationForm } from './create-application-form';
import { UseGithubCIForm } from './use-github-ci-form';

type Props = {
  secrets?: DeployKeyAndSecret;
  onRefreshApps: () => unknown;
  onCreateApplication: (
    application: ApplicationRegistration,
    acknowledgeWarnings: boolean
  ) => Promise<string[]>;
};

export function CreateApplicationScrim({
  secrets,
  onRefreshApps,
  onCreateApplication,
}: Props) {
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
              <ConfigureGithubDeploykey secrets={secrets} app={registration} />
              <Divider style={{ width: '100%' }} />
              <Button onClick={() => setNewPage('ci')}>Configure CI</Button>
            </>
          )}

          {page === 'ci' && registration && (
            <>
              <UseGithubCIForm
                useGithub={useGithub}
                setUseGithub={setUseGithub}
              />
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
