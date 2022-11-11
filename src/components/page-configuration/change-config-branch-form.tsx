import {
  Accordion,
  Button,
  CircularProgress,
  List,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSaveConfigBranch } from './use-save-config-branch';

import { Alert } from '../alert';
import { routes } from '../../routes';
import { RequestState } from '../../state/state-utils/request-states';
import { routeWithParams } from '../../utils/string';

export interface ChangeConfigBranchFormProps {
  appName: string;
  configBranch: string;
}

export const ChangeConfigBranchForm = ({
  appName,
  configBranch,
}: ChangeConfigBranchFormProps): JSX.Element => {
  const [saveState, saveFunc, resetState] = useSaveConfigBranch(appName);
  const [configBranchState, setConfigBranchState] = useState(configBranch);
  const [savedConfigBranchState, setSavedConfigBranchState] =
    useState(configBranch);

  useEffect(() => {
    setConfigBranchState(configBranch);
  }, [configBranch]);

  function handleSubmit(ev: FormEvent): void {
    ev.preventDefault();
    saveFunc(configBranchState);
    setSavedConfigBranchState(configBranchState);
  }

  function onBranchChange({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void {
    if (saveState.status !== RequestState.IDLE) {
      resetState();
    }
    setConfigBranchState(value);
  }

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Change config branch</Typography>
          </Accordion.HeaderTitle>
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
              id="branchField"
              helperText="The name of the branch where Radix will read the radixconfig.yaml from, e.g. 'main' or 'master'"
              disabled={saveState.status === RequestState.IN_PROGRESS}
              type="text"
              value={configBranchState}
              onChange={onBranchChange}
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
            <div>
              {saveState.status === RequestState.IN_PROGRESS ? (
                <>
                  <CircularProgress size={24} /> Updating…
                </>
              ) : (
                <Button
                  color="danger"
                  type="submit"
                  disabled={
                    savedConfigBranchState === configBranchState ||
                    !(configBranchState?.trim().length > 0)
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
} as PropTypes.ValidationMap<ChangeConfigBranchFormProps>;
