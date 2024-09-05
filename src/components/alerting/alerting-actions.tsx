import { Button } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import './style.css';
import type { AlertingConfig } from '../../store/radix-api';

type Props = {
  config: AlertingConfig;
  isSaving: boolean;
  isEdit: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onEnable: () => void;
  onDisable: () => void;
};

export const AlertingActions = ({
  isEdit,
  isSaving,
  config,
  onEdit,
  onCancel,
  onEnable,
  onDisable,
  onSave,
}: Props) => {
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
          <Button disabled={isSaving} onClick={onEnable}>
            Enable Alerts
          </Button>
        )}
      </div>

      <div className="grid grid--gap-small grid--auto-columns">
        {config.enabled && (
          <Button disabled={isSaving} color="danger" onClick={onDisable}>
            Disable Alerts
          </Button>
        )}
      </div>
    </div>
  );
};

AlertingActions.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  config: PropTypes.object.isRequired as PropTypes.Validator<AlertingConfig>,

  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onEnable: PropTypes.func.isRequired,
  onDisable: PropTypes.func.isRequired,
};
