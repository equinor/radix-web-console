import { Button } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  AlertingConfigModel,
  AlertingConfigModelValidationMap,
} from '../../models/radix-api/alerting/alerting-config';
import {
  UpdateAlertingConfigModel,
  UpdateAlertingConfigModelValidationMap,
} from '../../models/radix-api/alerting/update-alerting-config';

import './style.css';

export const AlertingActions: FunctionComponent<{
  config: AlertingConfigModel;
  editConfig?: UpdateAlertingConfigModel;
  enableAlertingCallback: () => void;
  disableAlertingCallback: () => void;
  editAlertingEnableCallback: () => void;
  editAlertingDisableCallback: () => void;
  saveAlertingCallback: () => void;
  isSaving: boolean;
  isAlertingEditEnabled: boolean;
  isAlertingEditDirty: boolean;
}> = ({
  config,
  isSaving,
  enableAlertingCallback,
  disableAlertingCallback,
  editAlertingEnableCallback,
  editAlertingDisableCallback,
  saveAlertingCallback,
  isAlertingEditEnabled,
  isAlertingEditDirty,
}) => (
  <div className="alerting-actions">
    <div className="grid grid--gap-small grid--auto-columns">
      {config.enabled ? (
        <>
          {isAlertingEditEnabled ? (
            <>
              <Button
                disabled={!isAlertingEditDirty || isSaving}
                onClick={saveAlertingCallback}
              >
                Save
              </Button>
              <Button
                disabled={isSaving}
                variant="outlined"
                onClick={editAlertingDisableCallback}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              disabled={!config.ready}
              onClick={editAlertingEnableCallback}
            >
              Edit
            </Button>
          )}
        </>
      ) : (
        <Button
          disabled={isSaving}
          onClick={(ev) => {
            ev.preventDefault();
            enableAlertingCallback();
          }}
        >
          Enable Alerts
        </Button>
      )}
    </div>

    <div className="grid grid--gap-small grid--auto-columns">
      {config.enabled && (
        <Button
          disabled={isSaving}
          color="danger"
          onClick={(ev) => {
            ev.preventDefault();
            disableAlertingCallback();
          }}
        >
          Disable Alerts
        </Button>
      )}
    </div>
  </div>
);

AlertingActions.propTypes = {
  config: PropTypes.shape(AlertingConfigModelValidationMap)
    .isRequired as PropTypes.Validator<AlertingConfigModel>,
  editConfig: PropTypes.shape(
    UpdateAlertingConfigModelValidationMap
  ) as PropTypes.Validator<UpdateAlertingConfigModel>,
  enableAlertingCallback: PropTypes.func.isRequired,
  disableAlertingCallback: PropTypes.func.isRequired,
  editAlertingEnableCallback: PropTypes.func.isRequired,
  editAlertingDisableCallback: PropTypes.func.isRequired,
  saveAlertingCallback: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isAlertingEditEnabled: PropTypes.bool.isRequired,
  isAlertingEditDirty: PropTypes.bool.isRequired,
};
