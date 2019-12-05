import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import useSaveOwner from './use-save-owner';

import Alert from '../alert';
import FormField from '../form-field';
import Button from '../button';
import Panel from '../panel';
import Spinner from '../spinner';
import Toggler from '../toggler';

import requestStates from '../../state/state-utils/request-states';

export const ChangeOwnerForm = props => {
  const [savedOwner, setSavedOwner] = useState(null);
  const [owner, setOwner] = useState(props.owner);
  const [saveState, resetState] = useSaveOwner(props.appName, savedOwner);

  useEffect(() => setOwner(props.owner), [props.owner]);

  const handleSubmit = ev => {
    ev.preventDefault();
    setSavedOwner(owner);
  };

  const setOwnerAndResetSaveState = owner => {
    if (saveState.status !== requestStates.IDLE) {
      resetState();
    }
    setOwner(owner);
  };

  return (
    <Panel>
      <Toggler summary="Change owner">
        <form onSubmit={handleSubmit}>
          {saveState.status === requestStates.FAILURE && (
            <Alert type="danger" className="gap-bottom">
              Failed to change owner. {saveState.error}
            </Alert>
          )}
          <fieldset disabled={saveState.status === requestStates.IN_PROGRESS}>
            <FormField help="Owner of the application (email). Can be a single person or shared group email">
              <input
                name="owner"
                type="email"
                value={owner}
                onChange={ev => setOwnerAndResetSaveState(ev.target.value)}
              />
            </FormField>
            <div className="o-action-bar">
              {saveState.status === requestStates.IN_PROGRESS && (
                <Spinner>Updating…</Spinner>
              )}
              <Button
                btnType="danger"
                disabled={props.owner === owner || savedOwner === owner}
              >
                Change owner
              </Button>
            </div>
          </fieldset>
        </form>
      </Toggler>
    </Panel>
  );
};

ChangeOwnerForm.propTypes = {
  appName: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default ChangeOwnerForm;
