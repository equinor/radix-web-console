import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import useSaveWBS from './use-save-wbs';

import Alert from '../alert';

import requestStates from '../../state/state-utils/request-states';

import {
  Accordion,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@equinor/eds-core-react';

export const ChangeWBSForm = (props) => {
  const [savedWBS, setSavedWBS] = useState(props.wbs);
  const [wbs, setWBS] = useState(props.wbs);
  const [saveState, saveFunc, resetState] = useSaveWBS(props.appName);

  useEffect(() => setWBS(props.wbs), [props.wbs]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    saveFunc(wbs);
    setSavedWBS(wbs);
  };

  const setWBSAndResetSaveState = (wbs) => {
    if (saveState.status !== requestStates.IDLE) {
      resetState();
    }
    setWBS(wbs);
  };

  return (
    <Accordion.Item className="accordion">
      <Accordion.Header>
        <Typography>Change WBS</Typography>
      </Accordion.Header>
      <Accordion.Panel>
        <form onSubmit={handleSubmit} className="grid grid--gap-medium">
          {saveState.status === requestStates.FAILURE && (
            <div>
              <Alert type="danger">
                Failed to change WBS. {saveState.error}
              </Alert>
            </div>
          )}
          <TextField
            label="WBS"
            helperText="WBS of the application for cost allocation"
            disabled={saveState.status === requestStates.IN_PROGRESS}
            type="text"
            value={wbs}
            onChange={(ev) => setWBSAndResetSaveState(ev.target.value)}
          />
          {saveState.status === requestStates.IN_PROGRESS ? (
            <div>
              <CircularProgress size="20" /> Updating…
            </div>
          ) : (
            <div>
              <Button
                color="danger"
                type="submit"
                disabled={
                  savedWBS === wbs || wbs === null || wbs.trim().length === 0
                }
              >
                Change WBS
              </Button>
            </div>
          )}
        </form>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

ChangeWBSForm.propTypes = {
  appName: PropTypes.string.isRequired,
  wbs: PropTypes.string.isRequired,
};

export default ChangeWBSForm;
