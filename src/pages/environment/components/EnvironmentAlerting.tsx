import { Button, Icon, Typography } from '@equinor/eds-core-react'
import { notifications, notifications_off } from '@equinor/eds-icons'
import { useState } from 'react'
import { Alerting } from '../../../components/alerting'
import AsyncResource from '../../../components/async-resource/async-resource'
import { handlePromiseWithToast } from '../../../components/global-top-nav/styled-toaster'
import { ScrimPopup } from '../../../components/scrim-popup'
import { pollingInterval } from '../../../store/defaults'
import { radixApi, type UpdateAlertingConfig } from '../../../store/radix-api'

import '../style.css'

interface Props {
  appName: string
  envName: string
}
export default function EnvironmentAlerting({ appName, envName }: Props) {
  const [visibleScrim, setVisibleScrim] = useState(false)
  const {
    data: alertingConfig,
    refetch,
    ...configState
  } = radixApi.useGetEnvironmentAlertingConfigQuery(
    {
      appName,
      envName,
    },
    { pollingInterval }
  )

  const [enableAlertMutation, { isLoading: savingEnable }] = radixApi.useEnableEnvironmentAlertingMutation()
  const [disableAlertMutation, { isLoading: savingDisable }] = radixApi.useDisableEnvironmentAlertingMutation()
  const [updateAlertMutation, { isLoading: savingUpdate }] = radixApi.useUpdateEnvironmentAlertingConfigMutation()

  const enableAlert = handlePromiseWithToast(async () => {
    await enableAlertMutation({ appName, envName }).unwrap()
    await refetch()
  })
  const disableAlert = handlePromiseWithToast(async () => {
    await disableAlertMutation({ appName, envName }).unwrap()
    await refetch()
    setVisibleScrim(false)
  })
  const updateAlert = handlePromiseWithToast(async (updateAlertingConfig: UpdateAlertingConfig) => {
    await updateAlertMutation({
      appName,
      envName,
      updateAlertingConfig,
    }).unwrap()
    await refetch()
    setVisibleScrim(false)
  })

  return (
    <AsyncResource asyncState={configState}>
      {alertingConfig && (
        <>
          <Typography>
            Alerting is{' '}
            <Typography as="span" bold>
              {alertingConfig.enabled ? 'enabled' : 'disabled'}
            </Typography>{' '}
            <Button variant="ghost" onClick={() => setVisibleScrim(true)}>
              {alertingConfig.enabled ? 'Edit alert' : 'Setup alert'}
              <Icon data={alertingConfig.enabled ? notifications : notifications_off} />
            </Button>
          </Typography>

          <ScrimPopup title="Alert Settings" open={visibleScrim} onClose={() => setVisibleScrim(false)}>
            <div className="environment-alerting-content">
              <Alerting
                isSaving={savingUpdate || savingDisable || savingEnable}
                alertingConfig={alertingConfig}
                updateAlerting={updateAlert}
                enableAlerting={enableAlert}
                disableAlerting={disableAlert}
              />
            </div>
          </ScrimPopup>
        </>
      )}
    </AsyncResource>
  )
}
