import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import useSaveWBS from './use-save-wbs';

import Alert from '../alert';

import requestStates from '../../state/state-utils/request-states';

import {
  Accordion,
  Button,
  CircularProgress,
  Input,
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
    <Accordion chevronPosition="right" headerLevel="p">
      <Accordion.Item className="accordion__item">
        <Accordion.Header className="accordion__header body_short">
          Change WBS
        </Accordion.Header>
        <Accordion.Panel className="accordion__panel">
          <form onSubmit={handleSubmit}>
            {saveState.status === requestStates.FAILURE && (
              <Alert type="danger" className="gap-bottom">
                Failed to change WBS. {saveState.error}
              </Alert>
            )}
            <p className="body_short">
              WBS of the application for cost allocation
            </p>
            <Input
              disabled={saveState.status === requestStates.IN_PROGRESS}
              type="text"
              value={wbs}
              onChange={(ev) => setWBSAndResetSaveState(ev.target.value)}
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
                  disabled={
                    savedWBS === wbs || wbs === null || wbs.trim().length === 0
                  }
                >
                  Change WBS
                </Button>
              )}
            </div>
          </form>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

ChangeWBSForm.propTypes = {
  appName: PropTypes.string.isRequired,
  wbs: PropTypes.string.isRequired,
};

export default ChangeWBSForm;
