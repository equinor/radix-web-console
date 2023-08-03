import { Suspense, lazy } from 'react';

import { pollApplications, pollApplicationsByNames } from './poll-applications';

import { DocumentTitle } from '../document-title';
import { GlobalTopNav } from '../global-top-nav';
import { LazyLoadFallback } from '../lazy-load-fallback';

import './style.css';

const AppList = lazy(() => import('../app-list'));

const [usePollApplications] = pollApplications();
const [usePollApplicationsByNames] = pollApplicationsByNames();

export const PageApplications = (): React.JSX.Element => (
  <div className="o-layout-main applications">
    <DocumentTitle title="Applications" />
    <GlobalTopNav />

    <div className="o-layout-main__content">
      <div className="o-layout-single">
        <Suspense fallback={<LazyLoadFallback />}>
          <AppList
            pollApplications={usePollApplications}
            pollApplicationsByNames={usePollApplicationsByNames}
          />
        </Suspense>
      </div>
    </div>
  </div>
);

export default PageApplications;
