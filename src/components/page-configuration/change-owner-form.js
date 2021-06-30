import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import useSaveOwner from './use-save-owner';

import Alert from '../alert';
import {
  Accordion,
  Button,
  Input,
  CircularProgress,
} from '@equinor/eds-core-react';

import requestStates from '../../state/state-utils/request-states';

export const ChangeOwnerForm = (props) => {
  const [savedOwner, setSavedOwner] = useState(props.owner);
  const [owner, setOwner] = useState(props.owner);
  const [saveState, saveFunc, resetState] = useSaveOwner(props.appName);

  useEffect(() => setOwner(props.owner), [props.owner]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    saveFunc(owner);
    setSavedOwner(owner);
  };

  const setOwnerAndResetSaveState = (owner) => {
    if (saveState.status !== requestStates.IDLE) {
      resetState();
    }
    setOwner(owner);
  };

  return (
    <Accordion.Item className="accordion__item">
      <Accordion.Header className="accordion__header body_short">
        Change owner
      </Accordion.Header>
      <Accordion.Panel className="accordion__panel">
        <form onSubmit={handleSubmit} className="accordion__content">
          {saveState.status === requestStates.FAILURE && (
            <Alert type="danger" className="gap-bottom">
              Failed to change owner. {saveState.error}
            </Alert>
          )}
          <p className="body_short">
            Owner of the application (email). Can be a single person or shared
            group email
          </p>
          <Input
            disabled={saveState.status === requestStates.IN_PROGRESS}
            type="email"
            value={owner}
            onChange={(ev) => setOwnerAndResetSaveState(ev.target.value)}
          />
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
                disabled={savedOwner === owner}
              >
                Change owner
              </Button>
            )}
          </div>
        </form>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

ChangeOwnerForm.propTypes = {
  appName: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default ChangeOwnerForm;
