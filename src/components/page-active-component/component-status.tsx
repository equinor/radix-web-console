import { Button } from '@equinor/eds-core-react';
import {
  type Component,
  useResetScaledComponentMutation,
} from '../../store/radix-api';
import { sleep } from '../../utils/sleep';
import { Alert } from '../alert';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';

type Props = {
  appName: string;
  envName: string;
  componentName: string;
  refetch: () => unknown;
  component: Component;
};

export function ComponentStatus({
  appName,
  envName,
  componentName,
  refetch,
  component,
}: Props) {
  const [resetTrigger, resetState] = useResetScaledComponentMutation();
  const onReset = handlePromiseWithToast(async () => {
    await resetTrigger({
      appName,
      envName,
      componentName,
    }).unwrap();
    await sleep(1000);
    await refetch();
  });

  const isStopped = component?.status === 'Stopped';
  const isManuallyScaled = component?.replicasOverride != null;
  const isManuallyStopped = isStopped && isManuallyScaled;
  return (
    <>
      {isStopped && !isManuallyScaled && (
        <Alert>Component has been stopped by autoscaler.</Alert>
      )}
      {isManuallyStopped && (
        <Alert type={'warning'}>
          Component has been manually stopped; Click reset to resume regular
          scaling.
          <br />
          <Button
            variant="outlined"
            color="primary"
            disabled={resetState.isLoading}
            onClick={onReset}
          >
            Reset
          </Button>
        </Alert>
      )}

      {isManuallyScaled && !isManuallyStopped && (
        <Alert type={'warning'}>
          Component has been manually scaled to {component.replicasOverride}{' '}
          replicas; Click reset to resume regular scaling.
          <br />
          <Button
            variant="outlined"
            color="primary"
            disabled={resetState.isLoading}
            onClick={onReset}
          >
            Reset
          </Button>
        </Alert>
      )}
    </>
  );
}
