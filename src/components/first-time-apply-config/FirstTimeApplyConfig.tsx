import { Button, CircularProgress, Typography } from '@equinor/eds-core-react'
import { useNavigate } from 'react-router'
import { hasAppliedRadixConfig } from '../../domain/radix-config/radixConfig.utils'
import { routes } from '../../router/routes'
import { type Application, useTriggerPipelineApplyConfigMutation } from '../../store/radix-api'
import { getFetchErrorMessage } from '../../store/utils/parse-errors'
import { routeWithParams } from '../../utils/string'
import { Banner } from '../banner/Banner'
import { RadixConfigFileLink } from '../link/radix-config-file-link'

import styles from './firstTimeApplyConfig.module.css'

interface FirstTimeApplyConfigProps {
  readonly application: Pick<Application, 'name' | 'registration' | 'environments'>
}

export const FirstTimeApplyConfig = (props: FirstTimeApplyConfigProps) => {
  const { application } = props
  const navigate = useNavigate()

  const [trigger, state] = useTriggerPipelineApplyConfigMutation()

  const applyConfig = async () => {
    const result = await trigger({
      appName: application.name,
      pipelineParametersApplyConfig: { deployExternalDNS: false },
    })

    if (result.data) {
      await navigate(routeWithParams(routes.appJob, { appName: application.name, jobName: result.data.name }))
    }
  }

  const hasAppliedConfig = hasAppliedRadixConfig(application)

  if (hasAppliedConfig) {
    return null
  }

  return (
    <Banner>
      <Typography className={styles.title} variant="h4" as="h2">
        Apply your Radix config to get started
      </Typography>

      <Banner.Message>
        Radix has not read your <RadixConfigFileLink registration={application.registration} /> yet. Apply it to create
        your environments and start building and deploying.{' '}
      </Banner.Message>

      {state.isError && <Banner.Message>Failed to apply config. {getFetchErrorMessage(state.error)}</Banner.Message>}

      <Banner.Actions>
        <Button onClick={applyConfig} disabled={state.isLoading}>
          {state.isLoading ? (
            <>
              <CircularProgress size={16} /> Applying…
            </>
          ) : (
            'Apply config'
          )}
        </Button>
      </Banner.Actions>
    </Banner>
  )
}
