import React from 'react';

import Panel from '../panel';
import Toggler from '../toggler';
import Code from '../code';
import PropTypes from 'prop-types';

import Button from '../button';
import Spinner from '../spinner';
import Alert from '../alert';
import requestStates from '../../state/state-utils/request-states';
import useRegenerateMachineUserToken from './use-regenerate-machine-user-token';

const MachineUserTokenForm = props => {
  const { appName } = props;

  const [
    regenerateMachineUserTokenState,
    regenerateMachineUserTokenFunc,
  ] = useRegenerateMachineUserToken(appName);

  const tokenResponse = regenerateMachineUserTokenState.data;

  return (
    <Panel>
      <Toggler summary="Machine user token">
        <div className="o-body-text">
          <p>
            Machine user token will allow for full app admin access of this
            application only. You should not be able to access other
            applications, even other applications that you own or that has the
            same app admin group. It is a per-application token.
          </p>
          <p>
            Please ensure that the token does not fall into the hands of others.
            The Radix team will be able to renew the token for you, if need be.
            Note also that the token may expire when we migrate cluster
          </p>
          <p>
            If you have lost or forgotten this token, you can regenerate it, but
            be aware that any scripts or applications using this token will need
            to be updated.
          </p>

          {tokenResponse && (
            <Code copy wrap>
              {tokenResponse.token}
            </Code>
          )}

          <div className="o-action-bar">
            {regenerateMachineUserTokenState.status ===
              requestStates.IN_PROGRESS && <Spinner>Regenerating…</Spinner>}
            {regenerateMachineUserTokenState.status ===
              requestStates.FAILURE && (
              <Alert type="danger">
                Failed to regenerate token.{' '}
                {regenerateMachineUserTokenState.error}
              </Alert>
            )}
            {
              <Button
                onClick={() => regenerateMachineUserTokenFunc()}
                btnType="danger"
                disabled={
                  regenerateMachineUserTokenState.status ===
                  requestStates.IN_PROGRESS
                }
              >
                Regenerate token
              </Button>
            }
          </div>
        </div>
      </Toggler>
    </Panel>
  );
};

MachineUserTokenForm.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default MachineUserTokenForm;
