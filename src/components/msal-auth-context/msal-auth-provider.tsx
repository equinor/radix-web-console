import { InteractionType, type PublicClientApplication } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser'
import React, { type PropsWithChildren, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setProvider } from '../../store/msal/reducer'
import { msGraphConfig, radixApiConfig, serviceNowApiConfig } from './config'

export type MsalContext = {
  graphAuthProvider?: AuthCodeMSALBrowserAuthenticationProvider
  serviceNowAuthProvider?: AuthCodeMSALBrowserAuthenticationProvider
  radixApiAuthProvider: AuthCodeMSALBrowserAuthenticationProvider
}

export function MsalAuthProvider({ children }: PropsWithChildren) {
  const { instance } = useMsal()
  const dispatch = useDispatch()
  const activeAccount = instance.getActiveAccount()

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

  return <>{children}</>
}
