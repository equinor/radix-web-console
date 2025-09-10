import { InteractionType } from '@azure/msal-browser'
import { useMsal, useMsalAuthentication } from '@azure/msal-react'
import type { FunctionComponent } from 'react'
import { RouterProvider, type RouterProviderProps } from 'react-router-dom'

import { LazyLoadFallback } from '../lazy-load-fallback'

import './style.css'

export const PageRouter: FunctionComponent<Pick<RouterProviderProps, 'router'>> = ({ router }) => {
  useMsalAuthentication(InteractionType.Redirect)
  const { accounts } = useMsal()
  if (accounts.length === 0) {
    return <></>
  }

  return (
    <div className="page-root">
      <div className="page-root-layout-base">
        <RouterProvider router={router} fallbackElement={<LazyLoadFallback />} />
      </div>
    </div>
  )
}
