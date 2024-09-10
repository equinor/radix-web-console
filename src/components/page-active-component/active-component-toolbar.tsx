import {
  Button,
  CircularProgress,
  Dialog,
  Slider,
  Typography,
} from '@equinor/eds-core-react';
import { useState } from 'react';
import {
  type Component,
  useRestartComponentMutation,
  useScaleComponentMutation,
  useStopComponentMutation,
} from '../../store/radix-api';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import './style.css';

type Props = {
  component: Component;
  appName: string;
  envName: string;
};

export function ActiveComponentToolbar({ component, appName, envName }: Props) {
  const [restartTrigger, restartState] = useRestartComponentMutation();
  const [stopTrigger, stopState] = useStopComponentMutation();

  const isStopped = component?.status === 'Stopped';
  const restartInProgress =
    restartState.isLoading ||
    component?.status === 'Reconciling' ||
    component?.status === 'Restarting';

  return (
    <>
      <div className="grid grid--gap-small">
        <div className="grid grid--gap-small grid--auto-columns">
          <ScaleButtonPopup
            disabled={false}
            appName={appName}
            envName={envName}
            componentName={component.name}
            currentReplicas={
              component.replicasOverride ?? component.replicaList.length
            }
          />
          <Button
            disabled={isStopped || stopState.isLoading}
            variant="outlined"
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
            disabled={isStopped || restartState.isLoading}
            variant="outlined"
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
          >
            Restart
          </Button>
          {restartInProgress && <CircularProgress size={32} />}
        </div>
      </div>
    </>
  );
}

type ScaleProps = {
  disabled: boolean;
  appName: string;
  envName: string;
  componentName: string;
  currentReplicas: number;
};

function ScaleButtonPopup({
  disabled,
  appName,
  envName,
  componentName,
  currentReplicas,
}: ScaleProps) {
  const [replicas, setReplicas] = useState<number | null>(null);
  const [visibleScrim, setVisibleScrim] = useState<boolean>(false);
  const [scaleTrigger, scaleState] = useScaleComponentMutation();
  const current = replicas ?? currentReplicas;

  const onScale = handlePromiseWithToast(
    async () => {
      await scaleTrigger({
        appName,
        envName,
        componentName,
        replicas: current.toFixed(),
      }).unwrap();
      setVisibleScrim(false);
      setReplicas(null);
    },
    'Scaling component',
    'Failed to scale component'
  );

  return (
    <div>
      <Button onClick={() => setVisibleScrim(true)} disabled={disabled}>
        Scale
      </Button>

      <Dialog
        title={'Scale Component'}
        open={!!visibleScrim}
        onClose={() => setVisibleScrim(false)}
        isDismissable
        style={{ width: '400px' }}
      >
        <Dialog.Header>
          <Dialog.Title>Scale Component</Dialog.Title>
        </Dialog.Header>
        <Dialog.Content>
          <Typography>
            This will disable any automatic scaling untill manuall scaling is
            reset.
          </Typography>
          <Slider
            value={current}
            min={0}
            max={20}
            onChange={(_, values) => setReplicas(values[0])}
            aria-labelledby="simple-slider"
          />
        </Dialog.Content>

        <Dialog.Actions>
          <div className={'scale-component-popup-actions-wrapper'}>
            <Button disabled={scaleState.isLoading} onClick={onScale}>
              {current === 0 ? 'Stop component' : `Scale to ${current}`}
            </Button>
            <Button variant="outlined" onClick={() => setVisibleScrim(false)}>
              Cancel
            </Button>
          </div>
        </Dialog.Actions>
      </Dialog>
    </div>
  );
}
