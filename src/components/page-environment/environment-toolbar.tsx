import { Button, CircularProgress, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { Environment, radixApi } from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils';

export const EnvironmentToolbar: FunctionComponent<{
  appName: string;
  environment: Readonly<Environment>;
  startEnabled?: boolean;
  stopEnabled?: boolean;
}> = ({
  appName,
  environment: { activeDeployment, name },
  startEnabled,
  stopEnabled,
}) => {
  const [start, startState] = radixApi.endpoints.startEnvironment.useMutation();
  const [stop, stopState] = radixApi.endpoints.stopEnvironment.useMutation();
  const [restart, restartState] =
    radixApi.endpoints.restartEnvironment.useMutation();

  const components =
    activeDeployment?.components?.filter(({ type }) => type === 'component') ||
    [];
  const stoppedComponents = components.filter(
    ({ status }) => status === 'Stopped'
  );
  const consistentComponents = components.filter(
    ({ status }) => status === 'Consistent'
  );
  const restartingComponents = components.filter(
    ({ status }) => status === 'Reconciling' || status === 'Restarting'
  );

  const consistentReplicasSum = consistentComponents.reduce(
    (sum, { replicaList }) => (sum += replicaList?.length ?? 0),
    0
  );

  const isStartEnabled = stoppedComponents.length > 0 && !startState.isLoading;
  const isStopEnabled =
    stoppedComponents.length < components.length && !stopState.isLoading;
  const isRestartEnabled =
    consistentComponents.length > 0 &&
    consistentReplicasSum > 0 &&
    !restartState.isLoading;

  const restartInProgress =
    (components.length > 0 &&
      restartingComponents.length === components.length) ||
    restartState.isLoading;

  return (
    <div className="grid grid--gap-small">
      <div className="grid grid--gap-small grid--auto-columns">
        {startEnabled && (
          <Button
            onClick={() => start({ appName, envName: name })}
            disabled={!isStartEnabled}
          >
            Start
          </Button>
        )}
        {stopEnabled && (
          <Button
            onClick={() => stop({ appName, envName: name })}
            disabled={!isStopEnabled}
          >
            Stop
          </Button>
        )}
        <Button
          onClick={() => restart({ appName, envName: name })}
          disabled={!isRestartEnabled}
          variant="outlined"
        >
          Restart
        </Button>
        {restartInProgress && <CircularProgress size={32} />}
      </div>

      {startState.isError && (
        <Typography>{getFetchErrorMessage(startState.error)}</Typography>
      )}
      {stopState.isError && (
        <Typography>{getFetchErrorMessage(stopState.error)}</Typography>
      )}
      {restartState.isError && (
        <Typography>{getFetchErrorMessage(restartState.error)}</Typography>
      )}
    </div>
  );
};

EnvironmentToolbar.propTypes = {
  appName: PropTypes.string.isRequired,
  environment: PropTypes.object.isRequired,
  startEnabled: PropTypes.bool,
  stopEnabled: PropTypes.bool,
};

export default EnvironmentToolbar;
