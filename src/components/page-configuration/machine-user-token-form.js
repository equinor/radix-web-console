import {
  Accordion,
  Button,
  CircularProgress,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import useRegenerateMachineUserToken from './use-regenerate-machine-user-token';

import { Alert } from '../alert';
import { Code } from '../code';
import { RequestState } from '../../state/state-utils/request-states';

export const MachineUserTokenForm = (props) => {
  const { appName } = props;

  const [regenerateMachineUserTokenState, regenerateMachineUserTokenFunc] =
    useRegenerateMachineUserToken(appName);

  const tokenResponse = regenerateMachineUserTokenState.data;

  return (
    <Accordion.Item className="accordion">
      <Accordion.Header>
        <Typography>Machine user token</Typography>
      </Accordion.Header>
      <Accordion.Panel>
        <div className="grid grid--gap-medium">
          <Typography>
            Machine user token will allow for full app admin access of this
            application only. You should not be able to access other
            applications, even other applications that you own or that has the
            same app admin group. It is a per-application token.
          </Typography>
          <Typography>
            Please ensure that the token does not fall into the hands of others.
            The Radix team will be able to renew the token for you, if need be.
            Note also that the token may expire when we migrate cluster
          </Typography>
          <Typography>
            If you have lost or forgotten this token, you can regenerate it, but
            be aware that any scripts or applications using this token will need
            to be updated.
          </Typography>

          {tokenResponse && <Code copy>{tokenResponse.token}</Code>}

          <div className="grid grid--gap-medium">
            {regenerateMachineUserTokenState.status ===
              RequestState.FAILURE && (
              <div>
                <Alert type="danger">
                  Failed to regenerate token.{' '}
                  {regenerateMachineUserTokenState.error}
                </Alert>
              </div>
            )}
            {regenerateMachineUserTokenState.status ===
            RequestState.IN_PROGRESS ? (
              <div>
                <CircularProgress size={20} /> Regenerating…
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => regenerateMachineUserTokenFunc()}
                  color="primary"
                  disabled={
                    regenerateMachineUserTokenState.status ===
                    RequestState.IN_PROGRESS
                  }
                >
                  Regenerate token
                </Button>
              </div>
            )}
          </div>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

MachineUserTokenForm.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default MachineUserTokenForm;
