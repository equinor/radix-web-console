import { Button, CircularProgress } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { errorToast } from '../global-top-nav/styled-toaster';
import {
  Component,
  useRestartComponentMutation,
  useStartComponentMutation,
  useStopComponentMutation,
} from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils';

type Props = {
  appName: string;
  envName: string;
  component?: Component;
  startEnabled?: boolean;
  stopEnabled?: boolean;
  refetch: Function;
};
export function Toolbar({
  appName,
  envName,
  component,
  startEnabled,
  stopEnabled,
  refetch,
}: Props) {
  const [startTrigger, startState] = useStartComponentMutation();
  const [restartTrigger, restartState] = useRestartComponentMutation();
  const [stopTrigger, stopState] = useStopComponentMutation();

  const isStartEnabled =
    !startState.isLoading && component?.status === 'Stopped';

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
      await startTrigger({
        appName,
        envName,
        componentName: component.name,
      }).unwrap();
      await refetch();
    } catch (error) {
      errorToast(`Failed to start component. ${getFetchErrorMessage(error)}`);
    }
  };
  const onStop = async () => {
    try {
      await stopTrigger({
        appName,
        envName,
        componentName: component.name,
      }).unwrap();
      await refetch();
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
      await refetch();
    } catch (error) {
      errorToast(`Failed to restart component. ${getFetchErrorMessage(error)}`);
    }
  };
  return (
    <div className="grid grid--gap-small">
      <div className="grid grid--gap-small grid--auto-columns">
        {startEnabled && (
          <Button onClick={onStart} disabled={!isStartEnabled}>
            Start
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
