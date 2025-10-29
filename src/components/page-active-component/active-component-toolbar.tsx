import { Button, CircularProgress, Dialog, Slider, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import {
  type Component,
  useRestartComponentMutation,
  useScaleComponentMutation,
  useStopComponentMutation,
} from '../../store/radix-api'
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster'
import './style.css'
import { useDurationInterval } from '../../hooks/use-interval'

type Props = {
  component: Component
  appName: string
  envName: string
  refetch: () => unknown
}

export function ActiveComponentToolbar({ component, appName, envName, refetch }: Props) {
  const [scaleTrigger, scaleState] = useScaleComponentMutation()
  const [stopTrigger, stopState] = useStopComponentMutation()
  const [restartTrigger, restartState] = useRestartComponentMutation()
  const startRefetch = useDurationInterval(refetch)

  const isStopped = component?.status === 'Stopped'
  const isWorking =
    restartState.isLoading ||
    scaleState.isLoading ||
    stopState.isLoading ||
    component?.status === 'Reconciling' ||
    component?.status === 'Restarting'

  const onStop = handlePromiseWithToast(
    async () => {
      await stopTrigger({
        appName,
        envName,
        componentName: component.name,
      }).unwrap()
      startRefetch()
    },
    'Stopping component',
    'Failed to stop component'
  )

  const onRestart = handlePromiseWithToast(
    async () => {
      await restartTrigger({
        appName,
        envName,
        componentName: component.name,
      }).unwrap()
      startRefetch()
    },
    'Restarting component',
    'Failed to restart component'
  )

  const onScale = handlePromiseWithToast(
    async (replicas: number) => {
      await scaleTrigger({
        appName,
        envName,
        componentName: component.name,
        replicas: replicas.toFixed(),
      }).unwrap()
      startRefetch()
    },
    'Scaling component',
    'Failed to scale component'
  )
  return (
    <>
      <div className="grid grid--gap-small">
        <div className="grid grid--gap-small grid--auto-columns">
          <ScaleButtonPopup
            onScale={onScale}
            disabled={scaleState.isLoading}
            currentReplicas={component.replicasOverride ?? component.replicaList?.length ?? 0}
          />
          <Button disabled={isStopped || stopState.isLoading} variant="outlined" onClick={onStop}>
            Stop
          </Button>

          <Button disabled={isStopped || restartState.isLoading} variant="outlined" onClick={onRestart}>
            Restart
          </Button>
          {isWorking && <CircularProgress size={32} />}
        </div>
      </div>
    </>
  )
}

type ScaleProps = {
  disabled: boolean
  currentReplicas: number
  onScale: (replicas: number) => unknown
}

function ScaleButtonPopup({ disabled, currentReplicas, onScale }: ScaleProps) {
  const [replicas, setReplicas] = useState<number | null>(null)
  const [visibleScrim, setVisibleScrim] = useState<boolean>(false)
  const current = replicas ?? currentReplicas

  const onLocalScale = async () => {
    await onScale(current)
    setVisibleScrim(false)
    setReplicas(null)
  }

  return (
    <div>
      <Button onClick={() => setVisibleScrim(true)}>Scale</Button>

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
          <Typography>This will disable any automatic scaling until manual scaling is reset.</Typography>
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
            <Button disabled={disabled} onClick={onLocalScale}>
              {current === 0 ? 'Stop component' : `Scale to ${current}`}
            </Button>
            <Button variant="outlined" onClick={() => setVisibleScrim(false)}>
              Cancel
            </Button>
          </div>
        </Dialog.Actions>
      </Dialog>
    </div>
  )
}
