import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';
import { ConfigureApplicationGithub } from '../configure-application-github';
import { ScrimPopup } from '../scrim-popup';

import {
  type ApplicationRegistration,
  type RegisterApplicationApiArg,
  type RegisterApplicationApiResponse,
  radixApi,
  useRegisterApplicationMutation,
} from '../../store/radix-api';
import { NewApplyConfigPipelineLink } from '../link/apply-config-pipeline-link';
import './style.css';
import { CreateApplicationForm } from './create-application-form';

export default function PageCreateApplication() {
  const [refreshApps] = radixApi.endpoints.showApplications.useLazyQuery({});
  const [createApp] = useRegisterApplicationMutation();

  return (
    <PageCreateApplicationLayout
      onRefreshApps={() => refreshApps({})}
      onCreateApp={(data: RegisterApplicationApiArg) =>
        createApp(data).unwrap()
      }
    />
  );
}

type PageCreateApplicationLayoutProps = {
  onRefreshApps: () => unknown;
  onCreateApp: (
    data: RegisterApplicationApiArg
  ) => Promise<RegisterApplicationApiResponse>;
};

export function PageCreateApplicationLayout({
  onRefreshApps,
  onCreateApp,
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
                app={registration}
                startVisible
                onDeployKeyChange={() => void 0}
                useOtherCiToolOptionVisible
                initialSecretPollInterval={1500}
              />
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
