import { InteractionType } from '@azure/msal-browser'
import { useMsalAuthentication } from '@azure/msal-react'
import type { FunctionComponent } from 'react'
import { useStore } from 'react-redux'
import { RouterProvider, type RouterProviderProps } from 'react-router'
import type { RootState } from '../../store/store'
import './style.css'

export const PageRouter: FunctionComponent<Pick<RouterProviderProps, 'router'>> = ({ router }) => {
  useMsalAuthentication(InteractionType.Redirect)

  const authProvider = useAuthProvider()
  if (!authProvider) {
    return <></>
  }

  return (
    <div className="page-root">
      <div className="page-root-layout-base">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

const useAuthProvider = () => {
  const store = useStore<RootState>()
  const state = store.getState()
  return state.auth.provider
}
