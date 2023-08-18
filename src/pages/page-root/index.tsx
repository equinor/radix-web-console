import { FunctionComponent } from 'react';
import { Outlet } from 'react-router';

import { GlobalTopNav } from '../../components/global-top-nav';

export const PageRoot: FunctionComponent = () => (
  <div className="o-layout-main">
    <GlobalTopNav />
    <div className="o-layout-main__content">
      <Outlet />
    </div>
  </div>
);

export default PageRoot;
