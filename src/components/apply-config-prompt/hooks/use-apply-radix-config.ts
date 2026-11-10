import { useNavigate } from 'react-router'
import { routes } from '../../../router/routes'
import { useTriggerPipelineApplyConfigMutation } from '../../../store/radix-api'
import { getFetchErrorMessage } from '../../../store/utils/parse-errors'
import { routeWithParams } from '../../../utils/string'

/**
 * Triggers the apply-config pipeline for an application and navigates to the
 * resulting pipeline job once it has been created.
 */
export const useApplyRadixConfig = (appName: string) => {
  const navigate = useNavigate()
  const [trigger, state] = useTriggerPipelineApplyConfigMutation()

  const applyConfig = async () => {
    const result = await trigger({ appName, pipelineParametersApplyConfig: { deployExternalDNS: false } })

    if (result.data) {
      await navigate(routeWithParams(routes.appJob, { appName, jobName: result.data.name }))
    }
  }

  return {
    applyConfig,
    isApplying: state.isLoading,
    applyErrorMessage: state.isError ? getFetchErrorMessage(state.error) : undefined,
  }
}
