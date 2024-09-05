import { Outlet } from 'react-router'

import { GlobalTopNav } from '../../components/global-top-nav'

export default function PageRoot() {
  return (
    <div className="o-layout-main">
      <GlobalTopNav />
      <div className="o-layout-main__content">
        <Outlet />
      </div>
    </div>
  )
}
