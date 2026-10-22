import { useDispatch } from 'react-redux'
import { radixApi } from '../../../../../store/radix-api'
import type { AppDispatch } from '../../../../../store/store'

interface UseSecretArgs {
  appName: string
  envName: string
  componentName: string
  secretName: string
}

export const useSecret = (args: UseSecretArgs) => {
  const { appName, envName, componentName, secretName } = args

  const dispatch = useDispatch<AppDispatch>()
  const [triggerUpdateSecret, { isLoading: isUpdatingSecret }] =
    radixApi.endpoints.changeComponentSecret.useMutation()

  const updateSecret = async (value: string) => {
    await triggerUpdateSecret({
      appName,
      envName,
      componentName,
      secretName,
      secretParameters: { secretValue: value },
    }).unwrap()

    // Refresh the environment cache entry shared with the secrets tables without adding a new subscription
    await dispatch(
      radixApi.endpoints.getEnvironment.initiate({ appName, envName }, { subscribe: false, forceRefetch: true })
    )
  }

  return { updateSecret, isUpdatingSecret }
}
