import { Button } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import './style.css';
import { AlertingConfig, UpdateAlertingConfig } from '../../store/radix-api';

export const AlertingActions: FunctionComponent<{
  isSaving: boolean;
  isEdit: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  config: AlertingConfig;
  editConfig?: UpdateAlertingConfig;
  onEnableAlerting: () => void;
  onDisableAlerting: () => void;
}> = ({
  isEdit,
  isSaving,
  onEdit,
  onCancel,
  config,
  onEnableAlerting,
  onDisableAlerting,
  onSave,
}) => {
  return (
    <div className="alerting-actions">
      <div className="grid grid--gap-small grid--auto-columns">
        {config.enabled ? (
          <>
            {isEdit ? (
              <>
                <Button disabled={isSaving} onClick={onSave}>
                  Save
                </Button>
                <Button
                  disabled={isSaving}
                  variant="outlined"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button disabled={!config.ready} onClick={onEdit}>
                Edit
              </Button>
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
  config: PropTypes.object.isRequired as PropTypes.Validator<AlertingConfig>,
  editConfig: PropTypes.object as PropTypes.Validator<UpdateAlertingConfig>,
  onEnableAlerting: PropTypes.func.isRequired,
  onDisableAlerting: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
};
