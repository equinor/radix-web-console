import { pollingInterval } from '../../../../../store/defaults'
import { radixApi, useGetEnvironmentQuery } from '../../../../../store/radix-api'
import { getFetchErrorMessage } from '../../../../../store/utils/parse-errors'
import { errorToast, successToast } from '../../../../global-top-nav/styled-toaster'

export const useSecret = ({
  appName,
  envName,
  componentName,
  secretName,
}: {
  appName: string
  envName: string
  componentName: string
  secretName: string
}) => {
  const { data, refetch, ...envState } = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval }
  )
  const [triggerUpdateSecret] = radixApi.endpoints.changeComponentSecret.useMutation()

  const secret =
    data?.activeDeployment && data.secrets?.find((x) => x.name === secretName && x.component === componentName)

  const updateSecret = async (value: string) => {
    try {
      await triggerUpdateSecret({
        appName,
        envName,
        componentName,
        secretName,
        secretParameters: { secretValue: value },
      }).unwrap()

      refetch()

      successToast('Secret updated successfully')
    } catch (error) {
      errorToast(`Error while saving. ${getFetchErrorMessage(error)}`)
    }
  }

  return { secret, fetchSecretsState: envState, updateSecret }
}
