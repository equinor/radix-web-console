import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useSaveConfigBranch from './use-save-config-branch';
import Alert from '../alert';
import FormField from '../form-field';
import Button from '../button';
import Panel from '../panel';
import Spinner from '../spinner';
import Toggler from '../toggler';
import requestStates from '../../state/state-utils/request-states';
import routes from '../../routes';
import { routeWithParams } from '../../utils/string';

export const ChangeConfigBranchForm = (props) => {
  const appName = props.appName;
  const [savedConfigBranch, setSavedConfigBranch] = useState(
    props.configBranch
  );
  const [configBranch, setConfigBranch] = useState(props.configBranch);
  const [saveState, saveFunc, resetState] = useSaveConfigBranch(props.appName);

  useEffect(() => setConfigBranch(props.configBranch), [props.configBranch]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    saveFunc(configBranch);
    setSavedConfigBranch(configBranch);
  };

  const setConfigBranchAndResetSaveState = (configBranch) => {
    if (saveState.status !== requestStates.IDLE) {
      resetState();
    }
    setConfigBranch(configBranch);
  };

  return (
    <Panel>
      <Toggler summary="Change config branch">
        <form onSubmit={handleSubmit}>
          {saveState.status === requestStates.FAILURE && (
            <Alert type="danger" className="gap-bottom">
              Failed to change Config Branch. {saveState.error}
            </Alert>
          )}
          <fieldset disabled={saveState.status === requestStates.IN_PROGRESS}>
            <FormField help="The name of the branch where Radix will read the radixconfig.yaml from, e.g. 'main' or 'master'">
              <input
                name="configBranch"
                type="text"
                value={configBranch}
                onChange={(ev) =>
                  setConfigBranchAndResetSaveState(ev.target.value)
                }
              />
            </FormField>
            <div className="o-body-text">
              <ol>
                <li>
                  Create a branch in GitHub that will be used as the new config
                  branch
                </li>
                <li>
                  Type the name of the new branch in the field above and click
                  "Change Config Branch"
                </li>
                <li>
                  In radixconfig.yaml in the new branch, modify one of the
                  environments to be built from this branch. This will trigger a
                  new build-deploy job
                </li>
                <li>
                  Go to{' '}
                  <Link
                    to={routeWithParams(routes.appJobs, { appName: appName })}
                  >
                    Pipeline Jobs
                  </Link>{' '}
                  to verify that the build-deploy job runs to completion
                </li>
              </ol>
            </div>
            <div className="o-action-bar">
              {saveState.status === requestStates.IN_PROGRESS && (
                <Spinner>Updating…</Spinner>
              )}
              <Button
                btnType="danger"
                type="submit"
                disabled={
                  savedConfigBranch === configBranch ||
                  configBranch === null ||
                  configBranch.trim().length === 0
                }
              >
                Change Config Branch
              </Button>
            </div>
          </fieldset>
        </form>
      </Toggler>
    </Panel>
  );
};

ChangeConfigBranchForm.propTypes = {
  appName: PropTypes.string.isRequired,
  configBranch: PropTypes.string.isRequired,
};

export default ChangeConfigBranchForm;
