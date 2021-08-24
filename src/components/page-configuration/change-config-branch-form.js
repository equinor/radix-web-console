import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useSaveConfigBranch from './use-save-config-branch';
import Alert from '../alert';
import requestStates from '../../state/state-utils/request-states';
import routes from '../../routes';
import { routeWithParams } from '../../utils/string';
import {
  Accordion,
  List,
  Button,
  CircularProgress,
  Typography,
  TextField,
} from '@equinor/eds-core-react';

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
    <Accordion.Item className="accordion">
      <Accordion.Header>
        <Typography>Change config branch</Typography>
      </Accordion.Header>
      <Accordion.Panel>
        <form onSubmit={handleSubmit} className="grid grid--gap-medium">
          {saveState.status === requestStates.FAILURE && (
            <div>
              <Alert type="danger">
                <Typography>
                  Failed to change Config Branch. {saveState.error}
                </Typography>
              </Alert>
            </div>
          )}
          <TextField
            label="Branch"
            helperText="The name of the branch where Radix will read the radixconfig.yaml from, e.g. 'main' or 'master'"
            disabled={saveState.status === requestStates.IN_PROGRESS}
            type="text"
            value={configBranch}
            onChange={(ev) => setConfigBranchAndResetSaveState(ev.target.value)}
          />
          <div className="o-body-text">
            <List variant="numbered">
              <List.Item>
                Create a branch in GitHub that will be used as the new config
                branch
              </List.Item>
              <List.Item>
                Type the name of the new branch in the field above and click
                "Change Config Branch"
              </List.Item>
              <List.Item>
                In radixconfig.yaml in the new branch, modify one of the
                environments to be built from this branch. This will trigger a
                new build-deploy job
              </List.Item>
              <List.Item>
                Go to{' '}
                <Link
                  to={routeWithParams(routes.appJobs, { appName: appName })}
                >
                  <Typography link as="span">
                    Pipeline Jobs
                  </Typography>
                </Link>{' '}
                to verify that the build-deploy job runs to completion
              </List.Item>
            </List>
          </div>
          {saveState.status === requestStates.IN_PROGRESS ? (
            <div>
              <CircularProgress size="20" /> Updating…
            </div>
          ) : (
            <div>
              <Button
                color="danger"
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
          )}
        </form>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

ChangeConfigBranchForm.propTypes = {
  appName: PropTypes.string.isRequired,
  configBranch: PropTypes.string.isRequired,
};

export default ChangeConfigBranchForm;
