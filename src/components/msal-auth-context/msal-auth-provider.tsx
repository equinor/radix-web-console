import {
  type AuthenticationResult,
  type EventCallbackFunction,
  EventType,
  InteractionType,
  PublicClientApplication,
} from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser'
import { type PropsWithChildren, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setAccount, setProvider } from '../../store/msal/reducer'
import { msalConfig, msGraphConfig, serviceNowApiConfig } from './config'

export type MsalContext = {
  graphAuthProvider?: AuthCodeMSALBrowserAuthenticationProvider
  serviceNowAuthProvider?: AuthCodeMSALBrowserAuthenticationProvider
}

export function MsalAuthProvider({ children }: PropsWithChildren) {
  const dispatch = useDispatch()

  const msal = useMemo(() => {
    const msal = new PublicClientApplication(msalConfig)
    const accounts = msal.getAllAccounts()
    if (accounts?.length > 0) {
      msal.setActiveAccount(accounts[0])
    }

    return msal
  }, [])

  const ctx = useMemo(() => {
    const account = msal.getActiveAccount()!
    return {
      // Used by the Graph SDK to authenticate API calls
      graphAuthProvider: new AuthCodeMSALBrowserAuthenticationProvider(msal, {
        account: account,
        interactionType: InteractionType.Redirect,
        scopes: msGraphConfig.scopes,
      }),
      // Used by the Graph SDK to authenticate API calls
      serviceNowAuthProvider: new AuthCodeMSALBrowserAuthenticationProvider(msal, {
        account: account,
        interactionType: InteractionType.Redirect,
        scopes: serviceNowApiConfig.scopes,
      }),
    }
  }, [msal])

  useEffect(() => {
    const callback: EventCallbackFunction = ({ eventType, payload }) => {
      if (eventType === EventType.LOGIN_SUCCESS) {
        const account = (payload as AuthenticationResult).account
        msal.setActiveAccount(account)
        dispatch(setAccount(account))
      }
    }

    const callbackId = msal.addEventCallback(callback)

    // @ts-expect-error callbackId can be null if running on Node / Serverside
    return () => msal.removeEventCallback(callbackId)
  }, [dispatch, msal])

  useEffect(() => {
    dispatch(setProvider(ctx))
  }, [ctx, dispatch])

  return <MsalProvider instance={msal}>{children}</MsalProvider>
}
