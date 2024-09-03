import { Button, CircularProgress } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { errorToast } from '../global-top-nav/styled-toaster';
import {
  Component,
  useResetScaledComponentMutation,
  useRestartComponentMutation,
  useStopComponentMutation,
} from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils';
import { sleep } from '../../utils/sleep';

type Props = {
  appName: string;
  envName: string;
  component?: Component;
  startEnabled?: boolean;
  stopEnabled?: boolean;
  refetch?: Function;
};
export function Toolbar({
  appName,
  envName,
  component,
  startEnabled,
  stopEnabled,
  refetch,
}: Props) {
  const [resetTrigger, resetState] = useResetScaledComponentMutation();
  const [restartTrigger, restartState] = useRestartComponentMutation();
  const [stopTrigger, stopState] = useStopComponentMutation();

  const isResetEnabled =
    !resetState.isLoading && component?.replicasOverride != null;

  const isStopEnabled =
    !stopState.isLoading &&
    component?.status !== 'Stopped' &&
    component?.replicaList?.length > 0;

  const isRestartEnabled =
    !restartState.isLoading &&
    component?.status === 'Consistent' &&
    component?.replicaList?.length > 0;

  const restartInProgress =
    restartState.isLoading ||
    component?.status === 'Reconciling' ||
    component?.status === 'Restarting';

  const onStart = async () => {
    try {
      await resetTrigger({
        appName,
        envName,
        componentName: component.name,
      }).unwrap();
      await refetch?.();
    } catch (error) {
      errorToast(
        `Failed to resume component scaling. ${getFetchErrorMessage(error)}`
      );
    }
  };
  const onStop = async () => {
    try {
      await stopTrigger({
        appName,
        envName,
        componentName: component.name,
      }).unwrap();
      await sleep(500);
      await refetch?.();
    } catch (error) {
      errorToast(`Failed to stop component. ${getFetchErrorMessage(error)}`);
    }
  };
  const onRestart = async () => {
    try {
      await restartTrigger({
        appName,
        envName,
        componentName: component.name,
      }).unwrap();
      await refetch?.();
    } catch (error) {
      errorToast(`Failed to restart component. ${getFetchErrorMessage(error)}`);
    }
  };
  return (
    <div className="grid grid--gap-small">
      <div className="grid grid--gap-small grid--auto-columns">
        {startEnabled && (
          <Button onClick={onStart} disabled={!isResetEnabled}>
            Scale
          </Button>
        )}

        {stopEnabled && (
          <Button onClick={onStop} disabled={!isStopEnabled}>
            Stop
          </Button>
        )}

        <Button
          onClick={onRestart}
          disabled={!isRestartEnabled}
          variant="outlined"
        >
          Restart
        </Button>

        {restartInProgress && <CircularProgress size={32} />}
      </div>
    </div>
  );
}

Toolbar.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  component: PropTypes.object as PropTypes.Validator<Component>,
  startEnabled: PropTypes.bool,
  stopEnabled: PropTypes.bool,
};
