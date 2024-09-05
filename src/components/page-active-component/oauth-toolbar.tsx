import { Button, CircularProgress } from '@equinor/eds-core-react'
import * as PropTypes from 'prop-types'

import { errorToast } from '../global-top-nav/styled-toaster'
import {
  type OAuth2AuxiliaryResource,
  useRestartOAuthAuxiliaryResourceMutation,
} from '../../store/radix-api'
import { getFetchErrorMessage } from '../../store/utils'

type Props = {
  appName: string
  envName: string
  componentName: string
  oauth2?: OAuth2AuxiliaryResource
}
export function OAuthToolbar({
  appName,
  envName,
  componentName,
  oauth2,
}: Props) {
  const [trigger, { isLoading }] = useRestartOAuthAuxiliaryResourceMutation()

  const isRestartEnabled =
    oauth2?.deployment?.status === 'Consistent' &&
    oauth2?.deployment?.replicaList?.length > 0 &&
    !isLoading

  const restartInProgress =
    isLoading || oauth2?.deployment?.status === 'Reconciling'

  return (
    <div className="grid grid--gap-small">
      <div className="grid grid--gap-small grid--auto-columns">
        {restartInProgress && <CircularProgress size={32} />}

        <Button
          onClick={async () => {
            try {
              await trigger({ appName, envName, componentName }).unwrap()
            } catch (error) {
              errorToast(
                `Failed to restart OAUTH. ${getFetchErrorMessage(error)}`
              )
            }
          }}
          disabled={!isRestartEnabled}
          variant="outlined"
        >
          Restart
        </Button>
      </div>
    </div>
  )
}

OAuthToolbar.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  oauth2: PropTypes.object as PropTypes.Validator<OAuth2AuxiliaryResource>,
}
