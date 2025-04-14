import {
  Accordion,
  Button,
  CircularProgress,
  List,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import {
  type ChangeEvent,
  type FormEvent,
  type FunctionComponent,
  useState,
} from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../routes';
import { useModifyRegistrationDetailsMutation } from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils/parse-errors';
import { routeWithParams } from '../../utils/string';
import { Alert } from '../alert';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';

export interface ChangeConfigBranchFormProps {
  appName: string;
  configBranch: string;
  refetch?: () => unknown;
}

export const ChangeConfigBranchForm: FunctionComponent<
  ChangeConfigBranchFormProps
> = ({ appName, configBranch, refetch }) => {
  const [configBranchState, setConfigBranchState] = useState(configBranch);
  const [mutate, { isLoading, error }] = useModifyRegistrationDetailsMutation();

  const handleSubmit = handlePromiseWithToast(async (ev: FormEvent) => {
    ev.preventDefault();

    await mutate({
      appName,
      applicationRegistrationPatchRequest: {
        applicationRegistrationPatch: {
          configBranch: configBranchState,
        },
      },
    }).unwrap();

    await refetch?.();
  });

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
            {error && (
              <div>
                <Alert type="danger">
                  <Typography>
                    Failed to change Config Branch.{' '}
                    {getFetchErrorMessage(error)}
                  </Typography>
                </Alert>
              </div>
            )}
            <TextField
              label="Branch"
              id="branchField"
              helperText="The name of the branch where Radix will read the radixconfig.yaml from, e.g. 'main' or 'master'"
              disabled={isLoading}
              type="text"
              value={configBranchState}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfigBranchState(e.target.value)
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
                  <Typography
                    as={Link}
                    to={routeWithParams(routes.appJobs, { appName: appName })}
                    link
                  >
                    Pipeline Jobs
                  </Typography>{' '}
                  to verify that the build-deploy job runs to completion
                </List.Item>
              </List>
            </div>
            <div>
              {isLoading ? (
                <>
                  <CircularProgress size={24} /> Updating…
                </>
              ) : (
                <Button
                  color="danger"
                  type="submit"
                  disabled={
                    configBranch === configBranchState || !configBranchState
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
