import React from 'react';

import Code from '../code';
import PropTypes from 'prop-types';

import Alert from '../alert';
import requestStates from '../../state/state-utils/request-states';
import useRegenerateMachineUserToken from './use-regenerate-machine-user-token';
import { Accordion, Button, CircularProgress } from '@equinor/eds-core-react';

const MachineUserTokenForm = (props) => {
  const { appName } = props;

  const [
    regenerateMachineUserTokenState,
    regenerateMachineUserTokenFunc,
  ] = useRegenerateMachineUserToken(appName);

  const tokenResponse = regenerateMachineUserTokenState.data;

  return (
    <Accordion.Item className="accordion__item">
      <Accordion.Header className="accordion__header body_short">
        Machine user token
      </Accordion.Header>
      <Accordion.Panel className="accordion__panel">
        <div className="accordion__content">
          <p className="body_short">
            Machine user token will allow for full app admin access of this
            application only. You should not be able to access other
            applications, even other applications that you own or that has the
            same app admin group. It is a per-application token.
          </p>
          <p className="body_short">
            Please ensure that the token does not fall into the hands of others.
            The Radix team will be able to renew the token for you, if need be.
            Note also that the token may expire when we migrate cluster
          </p>
          <p className="body_short">
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
              requestStates.IN_PROGRESS && (
              <>
                <CircularProgress size="24" />
                <span className="progress">Regenerating…</span>
              </>
            )}
            {regenerateMachineUserTokenState.status ===
              requestStates.FAILURE && (
              <Alert type="danger">
                Failed to regenerate token.{' '}
                {regenerateMachineUserTokenState.error}
              </Alert>
            )}
            {regenerateMachineUserTokenState.status !==
              requestStates.IN_PROGRESS && (
              <Button
                onClick={() => regenerateMachineUserTokenFunc()}
                color="primary"
                disabled={
                  regenerateMachineUserTokenState.status ===
                  requestStates.IN_PROGRESS
                }
              >
                Regenerate token
              </Button>
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
