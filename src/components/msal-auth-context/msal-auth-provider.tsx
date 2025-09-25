import {
  type AuthenticationResult,
  type EventCallbackFunction,
  EventType,
  InteractionType,
  PublicClientApplication,
} from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser'
import { type PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setProvider } from '../../store/msal/reducer'
import { msalConfig, msGraphConfig, radixApiConfig, serviceNowApiConfig } from './config'

const msal = new PublicClientApplication(msalConfig)

if (!msal.getActiveAccount() && msal.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msal.setActiveAccount(msal.getAllAccounts()[0])
}

export type MsalContext = {
  graphAuthProvider?: AuthCodeMSALBrowserAuthenticationProvider
  serviceNowAuthProvider?: AuthCodeMSALBrowserAuthenticationProvider
  radixApiAuthProvider: AuthCodeMSALBrowserAuthenticationProvider
}

export function MsalAuthProvider({ children }: PropsWithChildren) {
  const dispatch = useDispatch()

  const [activeAccount, setActiveAccount] = useState(msal.getActiveAccount())

  const ctx = useMemo(() => {
    if (!activeAccount) {
      return null
    }

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
  }, [activeAccount])

  useEffect(() => {
    const callback: EventCallbackFunction = ({ eventType, payload }) => {
      if (eventType === EventType.LOGIN_SUCCESS) {
        const account = (payload as AuthenticationResult).account
        msal.setActiveAccount(account)
        setActiveAccount(account)
      }
    }

    const callbackId = msal.addEventCallback(callback)

    return () => {
      if (callbackId) msal.removeEventCallback(callbackId)
    }
  })
  useEffect(() => {
    if (ctx) {
      dispatch(setProvider(ctx))
    }
  }, [ctx, dispatch])

  return <MsalProvider instance={msal}>{children}</MsalProvider>
}
