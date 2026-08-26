import { Outlet } from 'react-router'
import { GlobalTopNav } from '../../components/global-top-nav/GlobalTopNav'

export default function RootLayout() {
  return (
    <div className="o-layout-main">
      <GlobalTopNav />
      <div className="o-layout-main__content">
        <Outlet />
      </div>
    </div>
  )
}
