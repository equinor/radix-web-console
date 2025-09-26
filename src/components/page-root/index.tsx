import type { FunctionComponent } from 'react'
import { RouterProvider, type RouterProviderProps } from 'react-router-dom'

import { LazyLoadFallback } from '../lazy-load-fallback'

import './style.css'
import { InteractionType } from '@azure/msal-browser'
import { useMsalAuthentication } from '@azure/msal-react'
import { useStore } from 'react-redux'
import type { RootState } from '../../store/store'

export const PageRouter: FunctionComponent<Pick<RouterProviderProps, 'router'>> = ({ router }) => {
  useMsalAuthentication(InteractionType.Redirect)

  const authProvider = useAuthProvider()
  if (!authProvider) {
    return <></>
  }

  return (
    <div className="page-root">
      <div className="page-root-layout-base">
        <RouterProvider future={{ v7_startTransition: true }} router={router} fallbackElement={<LazyLoadFallback />} />
      </div>
    </div>
  )
}

const useAuthProvider = () => {
  const store = useStore<RootState>()
  const state = store.getState()
  return state.auth.provider
}
