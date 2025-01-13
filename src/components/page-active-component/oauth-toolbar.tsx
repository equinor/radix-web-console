import { Button, CircularProgress } from '@equinor/eds-core-react';
import { useDurationInterval } from '../../effects/use-interval';
import {
  type OAuth2AuxiliaryResource,
  useRestartOAuthAuxiliaryResourceMutation,
} from '../../store/radix-api';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';

type Props = {
  appName: string;
  envName: string;
  componentName: string;
  oauth2?: OAuth2AuxiliaryResource;
  refetch: () => unknown;
};
export function OAuthToolbar({
  appName,
  envName,
  componentName,
  oauth2,
  refetch,
}: Props) {
  const [trigger, { isLoading }] = useRestartOAuthAuxiliaryResourceMutation();
  const startRefetch = useDurationInterval(refetch);

  const isRestartEnabled =
    oauth2?.deployment?.status !== 'Stopped' || isLoading;

  const restartInProgress =
    isLoading || oauth2?.deployment?.status === 'Reconciling';

  const onRestart = handlePromiseWithToast(
    async () => {
      await trigger({ appName, envName, componentName }).unwrap();
      startRefetch();
    },
    'Restarting OAuth2 Service',
    'Failed to restart Oauth2 Service'
  );
  return (
    <div className="grid grid--gap-small">
      <div className="grid grid--gap-small grid--auto-columns">
        {restartInProgress && <CircularProgress size={32} />}

        <Button
          onClick={onRestart}
          disabled={!isRestartEnabled}
          variant="outlined"
        >
          Restart
        </Button>
      </div>
    </div>
  );
}
