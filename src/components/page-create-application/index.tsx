import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { ConfigureApplicationGithub } from '../configure-application-github';
import CreateApplicationForm from '../create-application-form';
import { ScrimPopup } from '../scrim-popup';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

import './style.css';
import { ApplicationRegistration } from '../../store/radix-api';

function scrollToPosition(elementRef: Element, x: number, y: number): void {
  elementRef.scrollTo?.(x, y);
}

type Props = { refetch: Function };
export default function PageCreateApplication({ refetch }: Props) {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [registration, setRegistration] =
    useState<ApplicationRegistration | null>(null);

  const onCloseScrim = () => {
    setVisibleScrim(false);
  };

  const onCreated = async (newRegistration: ApplicationRegistration) => {
    setRegistration(newRegistration);
    await refetch();
    scrollToPosition(containerRef.current, 0, 0);
  };

  return (
    <>
      <Button
        className="o-heading-page-button"
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
                refetch={refetch}
                app={registration}
                startVisible
                onDeployKeyChange={() => void 0}
                useOtherCiToolOptionVisible
                initialSecretPollInterval={1500}
              />
              <Typography>
                You can now go to{' '}
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
