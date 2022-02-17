import {
  Accordion,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import useSaveOwner from './use-save-owner';

import { Alert } from '../alert';
import { RequestState } from '../../state/state-utils/request-states';

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
    if (saveState.status !== RequestState.IDLE) {
      resetState();
    }
    setOwner(owner);
  };

  return (
    <Accordion.Item className="accordion">
      <Accordion.Header>
        <Typography>Change owner</Typography>
      </Accordion.Header>
      <Accordion.Panel>
        <form onSubmit={handleSubmit} className="grid grid--gap-medium">
          {saveState.status === RequestState.FAILURE && (
            <div>
              <Alert type="danger">
                Failed to change owner. {saveState.error}
              </Alert>
            </div>
          )}
          <TextField
            label="Email"
            helperText="Owner of the application (email). Can be a single person or shared group email"
            disabled={saveState.status === RequestState.IN_PROGRESS}
            type="email"
            value={owner}
            onChange={(ev) => setOwnerAndResetSaveState(ev.target.value)}
          />
          {saveState.status === RequestState.IN_PROGRESS ? (
            <div>
              <CircularProgress size={24} /> Updating…
            </div>
          ) : (
            <div>
              <Button
                color="danger"
                type="submit"
                disabled={savedOwner === owner}
              >
                Change owner
              </Button>
            </div>
          )}
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
