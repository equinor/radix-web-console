import { pollApplications, pollApplicationsByNames } from './poll-applications';

import AppList from '../app-list';
import { DocumentTitle } from '../document-title';
import { GlobalTopNav } from '../global-top-nav';

import './style.css';

const [usePollApplications] = pollApplications();
const [usePollApplicationsByNames] = pollApplicationsByNames();

export const PageApplications = (): JSX.Element => (
  <div className="o-layout-main applications">
    <DocumentTitle title="Applications" />
    <GlobalTopNav />
    <div className="o-layout-main__content">
      <div className="o-layout-single">
        <AppList
          pollApplications={usePollApplications}
          pollApplicationsByNames={usePollApplicationsByNames}
        />
      </div>
    </div>
  </div>
);
