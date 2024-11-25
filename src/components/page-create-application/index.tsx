import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';
import { ConfigureApplicationGithub } from '../configure-application-github';
import CreateApplicationForm from '../create-application-form';
import { ScrimPopup } from '../scrim-popup';

import './style.css';
import type { ApplicationRegistration } from '../../store/radix-api';

function scrollToPosition(
  elementRef: Element | null,
  x: number,
  y: number
): void {
  elementRef?.scrollTo?.(x, y);
}

export default function PageCreateApplication() {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [registration, setRegistration] =
    useState<ApplicationRegistration | null>(null);

  const onCloseScrim = () => {
    setVisibleScrim(false);
    setRegistration(null);
  };

  const onCreated = (newRegistration: ApplicationRegistration) => {
    scrollToPosition(containerRef.current, 0, 0);
    setRegistration(newRegistration);
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
            <CreateApplicationForm onCreated={onCreated} />
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
                <Typography
                  as={Link}
                  to={routeWithParams(
                    routes.appJobNew,
                    {
                      appName: registration.name,
                    },
                    { pipeline: 'apply-config' }
                  )}
                  link
                >
                  apply-config pipeline job
                </Typography>{' '}
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
