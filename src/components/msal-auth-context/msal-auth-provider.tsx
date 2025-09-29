import { InteractionType, type PublicClientApplication } from '@azure/msal-browser'
import { useAccount, useMsal } from '@azure/msal-react'
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser'
import React, { type PropsWithChildren, useCallback, useEffect, useMemo, useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { costApi } from '../../store/cost-api'
import { logApi } from '../../store/log-api'
import { msGraphApi } from '../../store/ms-graph-api'
import { setProvider } from '../../store/msal/reducer'
import { radixApi } from '../../store/radix-api'
import { scanApi } from '../../store/scan-api'
import { serviceNowApi } from '../../store/service-now-api'
import { msGraphConfig, radixApiConfig, serviceNowApiConfig } from './config'

export type MsalContext = {
  graphAuthProvider?: AuthCodeMSALBrowserAuthenticationProvider
  serviceNowAuthProvider?: AuthCodeMSALBrowserAuthenticationProvider
  radixApiAuthProvider: AuthCodeMSALBrowserAuthenticationProvider
}

export function MsalAuthProvider({ children }: PropsWithChildren) {
  const { instance } = useMsal()
  const dispatch = useDispatch()
  const activeAccount = useAccount()
  const [forceUpdateIdx, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    if (activeAccount) {
      dispatch(radixApi.util.resetApiState())
      dispatch(scanApi.util.resetApiState())
      dispatch(costApi.util.resetApiState())
      dispatch(logApi.util.resetApiState())
      dispatch(serviceNowApi.util.resetApiState())
      dispatch(msGraphApi.util.resetApiState())
      forceUpdate()
    }
  }, [activeAccount, dispatch])

  const ctx = useMemo(() => {
    if (!activeAccount) {
      return null
    }

    const msal = instance as PublicClientApplication
    return {
      // Used by the Graph SDK to authenticate API calls
      graphAuthProvider: new AuthCodeMSALBrowserAuthenticationProvider(msal, {
        account: activeAccount,
        interactionType: InteractionType.Redirect,
        scopes: msGraphConfig.scopes,
      }),
      // Used by the Graph SDK to authenticate API calls
      serviceNowAuthProvider: new AuthCodeMSALBrowserAuthenticationProvider(msal, {
        account: activeAccount,
        interactionType: InteractionType.Redirect,
        scopes: serviceNowApiConfig.scopes,
      }),
      radixApiAuthProvider: new AuthCodeMSALBrowserAuthenticationProvider(msal, {
        account: activeAccount,
        interactionType: InteractionType.Redirect,
        scopes: radixApiConfig.scopes,
      }),
    }
  }, [activeAccount, instance])

  useEffect(() => {
    if (ctx) {
      dispatch(setProvider(ctx))
    }
  }, [ctx, dispatch])

  return <React.Fragment key={forceUpdateIdx.toString()}>{children}</React.Fragment>
}
