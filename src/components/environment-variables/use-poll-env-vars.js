import { usePollingJson } from '../../effects';
import envVarsNormaliser from '../../models/environment-variable/normaliser';
import poolingState from '../../models/pooling-state';
import PropTypes from 'prop-types';

const usePollEnvVars = (appName, envName, componentName, poolingState) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  const path = `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`;
  const [result] = usePollingJson(
    path,
    poolingState.paused === true ? 0 : 8000
  );
  return [
    {
      ...result,
      data: result.data
        ? result.data.map((envVar) => envVarsNormaliser(envVar))
        : null,
    },
  ];
};

usePollEnvVars.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  poolingState: PropTypes.shape(poolingState),
};

export default usePollEnvVars;
