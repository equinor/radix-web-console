import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useSaveConfigBranch from './use-save-config-branch';
import Alert from '../alert';
import FormField from '../form-field';
import Spinner from '../spinner';
import requestStates from '../../state/state-utils/request-states';
import routes from '../../routes';
import { routeWithParams } from '../../utils/string';
import {
  Accordion,
  Input,
  List,
  Button,
  CircularProgress,
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
    <Accordion chevronPosition="right" headerLevel="p">
      <Accordion.Item className="accordion__item">
        <Accordion.Header className="accordion__header body_short">
          Change config branch
        </Accordion.Header>
        <Accordion.Panel className="accordion__panel">
          <form onSubmit={handleSubmit}>
            {saveState.status === requestStates.FAILURE && (
              <Alert type="danger" className="gap-bottom">
                Failed to change Config Branch. {saveState.error}
              </Alert>
            )}
            <Input
              disabled={saveState.status === requestStates.IN_PROGRESS}
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
                    Pipeline Jobs
                  </Link>{' '}
                  to verify that the build-deploy job runs to completion
                </List.Item>
              </List>
            </div>
            <div className="o-action-bar">
              {saveState.status === requestStates.IN_PROGRESS && (
                <>
                  <CircularProgress size="24" />
                  <span className="progress">Updating…</span>
                </>
              )}
              {saveState.status !== requestStates.IN_PROGRESS && (
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
              )}
            </div>
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

export default ChangeConfigBranchForm;
