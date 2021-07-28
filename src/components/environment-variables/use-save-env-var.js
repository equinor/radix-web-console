import { usePatchJson } from '../../effects';
import PropTypes from 'prop-types';
import updatableEnvVar from '../../models/environment-variable/updatable-environment-variable';

const useSaveEnvVar = ({
  appName,
  envName,
  componentName,
  updatableEnvVars,
}) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const path = `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`;

  return usePatchJson(path, (props) => {
    return props.updatableEnvVars;
  });
};

useSaveEnvVar.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  updatableEnvVars: PropTypes.arrayOf(PropTypes.shape(updatableEnvVar))
    .isRequired,
};
export default useSaveEnvVar;
