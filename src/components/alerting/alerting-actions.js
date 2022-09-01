import {
  AlertingConfigModelValidationMap,
  UpdateAlertingConfigModelValidationMap,
} from '../../models/alerting';
import PropTypes from 'prop-types';
import { Button } from '@equinor/eds-core-react';
import './style.css';

const AlertingActions = ({
  config,
  isSaving,
  enableAlertingCallback,
  disableAlertingCallback,
  editAlertingEnableCallback,
  editAlertingDisableCallback,
  saveAlertingCallback,
  isAlertingEditEnabled,
  isAlertingEditDirty,
}) => {
  const onEnableAlerting = (ev) => {
    ev.preventDefault();
    enableAlertingCallback();
  };
  const onDisableAlerting = (ev) => {
    ev.preventDefault();
    disableAlertingCallback();
  };
  return (
    <div className="alerting-actions">
      <div className="grid grid--gap-small grid--auto-columns">
        {config.enabled ? (
          <>
            {!isAlertingEditEnabled && (
              <Button
                disabled={!config.ready}
                onClick={editAlertingEnableCallback}
              >
                Edit
              </Button>
            )}
            {isAlertingEditEnabled && (
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
            )}
          </>
        ) : (
          <Button disabled={isSaving} onClick={onEnableAlerting}>
            Enable Alerts
          </Button>
        )}
      </div>
      <div className="grid grid--gap-small grid--auto-columns">
        {config.enabled && (
          <Button
            disabled={isSaving}
            color="danger"
            onClick={onDisableAlerting}
          >
            Disable Alerts
          </Button>
        )}
      </div>
    </div>
  );
};

AlertingActions.propTypes = {
  config: PropTypes.shape(AlertingConfigModelValidationMap).isRequired,
  editConfig: PropTypes.shape(UpdateAlertingConfigModelValidationMap),
  enableAlertingCallback: PropTypes.func.isRequired,
  disableAlertingCallback: PropTypes.func.isRequired,
  editAlertingEnableCallback: PropTypes.func.isRequired,
  editAlertingDisableCallback: PropTypes.func.isRequired,
  saveAlertingCallback: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isAlertingEditEnabled: PropTypes.bool.isRequired,
  isAlertingEditDirty: PropTypes.bool.isRequired,
};

export { AlertingActions };
