import { Button, CircularProgress } from '@equinor/eds-core-react';
import {
  type Component,
  useRestartComponentMutation,
  useScaleComponentMutation,
  useStopComponentMutation,
} from '../../store/radix-api';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';

type Props = {
  component: Component;
  appName: string;
  envName: string;
};

export function ActiveComponentToolbar({ component, appName, envName }: Props) {
  const [restartTrigger, restartState] = useRestartComponentMutation();
  const [stopTrigger, stopState] = useStopComponentMutation();
  const [scaleTrigger, scaleState] = useScaleComponentMutation();

  const isStopped = component?.status === 'Stopped';
  const restartInProgress =
    restartState.isLoading ||
    component?.status === 'Reconciling' ||
    component?.status === 'Restarting';

  return (
    <>
      <div className="grid grid--gap-small">
        <div className="grid grid--gap-small grid--auto-columns">
          <Button
            disabled={scaleState.isLoading}
            onClick={() =>
              handlePromiseWithToast(
                scaleTrigger({
                  appName,
                  envName,
                  componentName: component.name,
                  replicas: '0',
                }).unwrap,
                'Scaling component',
                'Failed to scale component'
              )
            }
          >
            Scale
          </Button>
          <Button
            disabled={isStopped || stopState.isLoading}
            onClick={() =>
              handlePromiseWithToast(
                stopTrigger({
                  appName,
                  envName,
                  componentName: component.name,
                }).unwrap,
                'Stopping component',
                'Failed to stop component'
              )
            }
          >
            Stop
          </Button>

          <Button
            onClick={() =>
              handlePromiseWithToast(
                restartTrigger({
                  appName,
                  envName,
                  componentName: component.name,
                }).unwrap,
                'Restarting component',
                'Failed to restart component'
              )
            }
            disabled={isStopped || restartState.isLoading}
            variant="outlined"
          >
            Restart
          </Button>
          {restartInProgress && <CircularProgress size={32} />}
        </div>
      </div>
    </>
  );
}
