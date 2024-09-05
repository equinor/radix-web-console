import { Button, CircularProgress } from '@equinor/eds-core-react'
import * as PropTypes from 'prop-types'
import type { FunctionComponent } from 'react'

import { errorToast } from '../global-top-nav/styled-toaster'
import { type Environment, radixApi } from '../../store/radix-api'
import { getFetchErrorMessage } from '../../store/utils'

export const EnvironmentToolbar: FunctionComponent<{
  appName: string
  environment: Readonly<Environment>
  startEnabled?: boolean
  stopEnabled?: boolean
  fethcEnvironment?: () => Promise<unknown>
}> = ({
  appName,
  environment: { activeDeployment, name },
  startEnabled,
  stopEnabled,
  fethcEnvironment,
}) => {
  const [start, startState] = radixApi.endpoints.startEnvironment.useMutation()
  const [stop, stopState] = radixApi.endpoints.stopEnvironment.useMutation()
  const [restart, restartState] =
    radixApi.endpoints.restartEnvironment.useMutation()

  const components =
    activeDeployment?.components?.filter(({ type }) => type === 'component') ||
    []
  const stoppedComponents = components.filter(
    ({ status }) => status === 'Stopped'
  )
  const consistentComponents = components.filter(
    ({ status }) => status === 'Consistent'
  )
  const restartingComponents = components.filter(
    ({ status }) => status === 'Reconciling' || status === 'Restarting'
  )

  const consistentReplicasSum = consistentComponents.reduce(
    (sum, { replicaList }) => (sum += replicaList?.length ?? 0),
    0
  )

  const isStartEnabled = stoppedComponents.length > 0 && !startState.isLoading
  const isStopEnabled =
    stoppedComponents.length < components.length && !stopState.isLoading
  const isRestartEnabled =
    consistentComponents.length > 0 &&
    consistentReplicasSum > 0 &&
    !restartState.isLoading

  const restartInProgress =
    (components.length > 0 &&
      restartingComponents.length === components.length) ||
    restartState.isLoading

  return (
    <div className="grid grid--gap-small">
      <div className="grid grid--gap-small grid--auto-columns">
        {startEnabled && (
          <Button
            onClick={async () => {
              try {
                await start({ appName, envName: name }).unwrap()
                fethcEnvironment?.()
              } catch (error) {
                errorToast(
                  `Failed to start environment. ${getFetchErrorMessage(error)}`
                )
              }
            }}
            disabled={!isStartEnabled}
          >
            Start
          </Button>
        )}
        {stopEnabled && (
          <Button
            onClick={async () => {
              try {
                await stop({ appName, envName: name }).unwrap()
                fethcEnvironment?.()
              } catch (error) {
                errorToast(
                  `Failed to stop environment. ${getFetchErrorMessage(error)}`
                )
              }
            }}
            disabled={!isStopEnabled}
          >
            Stop
          </Button>
        )}
        <Button
          onClick={async () => {
            try {
              await restart({ appName, envName: name }).unwrap()
              fethcEnvironment?.()
            } catch (error) {
              errorToast(
                `Failed to restart environment. ${getFetchErrorMessage(error)}`
              )
            }
          }}
          disabled={!isRestartEnabled}
          variant="outlined"
        >
          Restart
        </Button>
        {restartInProgress && <CircularProgress size={32} />}
      </div>
    </div>
  )
}

EnvironmentToolbar.propTypes = {
  appName: PropTypes.string.isRequired,
  environment: PropTypes.object.isRequired,
  startEnabled: PropTypes.bool,
  stopEnabled: PropTypes.bool,
}

export default EnvironmentToolbar
