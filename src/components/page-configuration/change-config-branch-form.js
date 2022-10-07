import {
  Accordion,
  Button,
  CircularProgress,
  List,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useSaveConfigBranch from './use-save-config-branch';
import { Alert } from '../alert';
import { RequestState } from '../../state/state-utils/request-states';
import { routes } from '../../routes';
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
    if (saveState.status !== RequestState.IDLE) {
      resetState();
    }
    setConfigBranch(configBranch);
  };

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Typography>Change config branch</Typography>
        </Accordion.Header>
        <Accordion.Panel>
          <form className="grid grid--gap-medium" onSubmit={handleSubmit}>
            {saveState.status === RequestState.FAILURE && (
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
              disabled={saveState.status === RequestState.IN_PROGRESS}
              type="text"
              value={configBranch}
              onChange={(ev) =>
                setConfigBranchAndResetSaveState(ev.target.value)
              }
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
            {saveState.status === RequestState.IN_PROGRESS ? (
              <div>
                <CircularProgress size={24} /> Updating…
              </div>
            ) : (
              <div>
                <Button
                  color="danger"
                  type="submit"
                  disabled={
                    savedConfigBranch === configBranch ||
                    !configBranch ||
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
    </Accordion>
  );
};

ChangeConfigBranchForm.propTypes = {
  appName: PropTypes.string.isRequired,
  configBranch: PropTypes.string.isRequired,
};
