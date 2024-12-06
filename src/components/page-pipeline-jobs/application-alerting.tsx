import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { notifications, notifications_off } from '@equinor/eds-icons';
import { useState } from 'react';

import { Alerting } from '../alerting';
import AsyncResource from '../async-resource/async-resource';
import { ScrimPopup } from '../scrim-popup';

import './style.css';
import { pollingInterval } from '../../store/defaults';
import { type UpdateAlertingConfig, radixApi } from '../../store/radix-api';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';

interface Props {
  appName: string;
}

const ApplicationAlerting = ({ appName }: Props) => {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const {
    data: config,
    refetch,
    ...state
  } = radixApi.useGetApplicationAlertingConfigQuery(
    { appName },
    { pollingInterval }
  );

  const [enableAlertMutation, { isLoading: savingEnable }] =
    radixApi.useEnableApplicationAlertingMutation();
  const [disableAlertMutation, { isLoading: savingDisable }] =
    radixApi.useDisableApplicationAlertingMutation();
  const [updateAlertMutation, { isLoading: savingUpdate }] =
    radixApi.useUpdateApplicationAlertingConfigMutation();

  const enableAlert = handlePromiseWithToast(async () => {
    await enableAlertMutation({ appName }).unwrap();
    await refetch();
  });
  const disableAlert = handlePromiseWithToast(async () => {
    await disableAlertMutation({ appName }).unwrap();
    await refetch();
    setVisibleScrim(false);
  });
  const updateAlert = handlePromiseWithToast(
    async (updateAlertingConfig: UpdateAlertingConfig) => {
      await updateAlertMutation({ appName, updateAlertingConfig }).unwrap();
      await refetch();
      setVisibleScrim(false);
    }
  );

  return (
    <AsyncResource asyncState={state}>
      {config && (
        <>
          <Typography>
            Alerting is{' '}
            <Typography as="span" bold>
              {config.enabled ? 'enabled' : 'disabled'}
            </Typography>{' '}
            <Button variant="ghost" onClick={() => setVisibleScrim(true)}>
              {config.enabled ? 'Edit alert' : 'Setup alert'}
              <Icon data={config.enabled ? notifications : notifications_off} />
            </Button>
          </Typography>
          <ScrimPopup
            title="Alert Settings"
            open={visibleScrim}
            onClose={() => setVisibleScrim(false)}
          >
            <div className="application-alerting-content">
              <Alerting
                isSaving={savingUpdate || savingDisable || savingEnable}
                alertingConfig={config}
                updateAlerting={updateAlert}
                enableAlerting={enableAlert}
                disableAlerting={disableAlert}
              />
            </div>
          </ScrimPopup>
        </>
      )}
    </AsyncResource>
  );
};

export default ApplicationAlerting;
