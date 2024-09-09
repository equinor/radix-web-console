import {
  Button,
  CircularProgress,
  Slider,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { type ChangeEvent, useState } from 'react';
import {
  type Component,
  useRestartComponentMutation,
  useScaleComponentMutation,
  useStopComponentMutation,
} from '../../store/radix-api';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import { ScrimPopup } from '../scrim-popup';

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
          <ScaleButtonPopover
            disabled={false}
            appName={appName}
            envName={envName}
            componentName={component.name}
          />
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

type ScaleProps = {
  disabled: boolean;
  appName: string;
  envName: string;
  componentName: string;
};

function ScaleButtonPopover({
  disabled,
  appName,
  envName,
  componentName,
}: ScaleProps) {
  const [replicas, setReplicas] = useState(0);
  const [visibleScrim, setVisibleScrim] = useState<boolean>(false);
  const [scaleTrigger, scaleState] = useScaleComponentMutation();

  const onScale = handlePromiseWithToast(
    async () => {
      await scaleTrigger({
        appName,
        envName,
        componentName,
        replicas: replicas.toFixed(),
      }).unwrap();
      setVisibleScrim(false);
    },
    'Scaling component',
    'Failed to scale component'
  );

  return (
    <div>
      <Button onClick={() => setVisibleScrim(true)} disabled={disabled}>
        Scale
      </Button>

      <ScrimPopup
        title={'Scale Component'}
        open={!!visibleScrim}
        onClose={() => setVisibleScrim(false)}
        isDismissable
      >
        <Slider
          value={4}
          min={0}
          max={20}
          aria-labelledby="simple-slider"
          labelAlwaysOn
        />
        <TextField
          id="deleteConfirmField"
          type={'number'}
          min={0}
          max={20}
          unit={'replicas'}
          value={replicas}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setReplicas(Number(e.target.value))
          }
        />
        <div className="grid grid--gap-medium grid--auto-columns rerun-job-content">
          <div className="rerun-job-options">
            <Typography>
              Manually scale component. This will disable any automatic scaling{' '}
              <br />
              untill manuall scaling is reset.
            </Typography>
          </div>
          <Button.Group>
            <Button disabled={scaleState.isLoading} onClick={onScale}>
              Scale
            </Button>
            <Button variant="outlined" onClick={() => setVisibleScrim(false)}>
              Cancel
            </Button>
          </Button.Group>
        </div>
      </ScrimPopup>
    </div>
  );
}
