import {
  Accordion,
  Button,
  CircularProgress,
  Typography,
} from '@equinor/eds-core-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ServiceNowApplicationModel } from '../../models/servicenow';
import { RequestState } from '../../state/state-utils/request-states';
import { refreshApp } from '../../state/subscriptions/action-creators';
import { Alert } from '../alert';
import { AppConfigConfigurationItem } from '../app-config-ci';
import { useSaveConfigurationItem } from './use-save-ci';

export const ChangeConfigurationItemForm = ({
  appName,
  configurationItem,
}: {
  appName: string;
  configurationItem?: string;
}): JSX.Element => {
  const [newCI, setNewCI] = useState<ServiceNowApplicationModel>();
  const [saveState, saveFunc, resetState] = useSaveConfigurationItem(appName);
  const dispatch = useDispatch();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    saveFunc(newCI.id);
  };

  useEffect(() => {
    if (saveState.status === RequestState.SUCCESS) {
      resetState();
      setNewCI(null);
      dispatch(refreshApp(appName));
    }
  }, [saveState, resetState, dispatch, appName]);

  const isDirty = newCI && newCI.id !== configurationItem;
  const isSaving = saveState.status === RequestState.IN_PROGRESS;

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item style={{ overflow: 'visible' }}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Change configuration item</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <form className="grid grid--gap-medium" onSubmit={handleSubmit}>
            {saveState.status === RequestState.FAILURE && (
              <div>
                <Alert type="danger">
                  <Typography>
                    Failed to change Configuration Item. {saveState.error}
                  </Typography>
                </Alert>
              </div>
            )}
            <AppConfigConfigurationItem
              configurationItem={configurationItem}
              configurationItemChangeCallback={setNewCI}
              disabled={isSaving}
            />
            {saveState.status === RequestState.IN_PROGRESS ? (
              <div>
                <CircularProgress size={24} /> Updating…
              </div>
            ) : (
              <div>
                <Button color="danger" type="submit" disabled={!isDirty}>
                  Change configuration item
                </Button>
              </div>
            )}
          </form>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
