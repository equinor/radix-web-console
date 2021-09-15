import React from 'react';

import DocumentTitle from '../document-title';
import GlobalTopNav from '../global-top-nav';
import AppList from '../app-list';
import './style.css';
import { pollApplications, pollApplicationsByNames } from './poll-applications';

const [usePollApplications] = pollApplications();
const [usePollApplicationsByNames] = pollApplicationsByNames();

export const PageApplications = () => {
  return (
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
};

export default PageApplications;
