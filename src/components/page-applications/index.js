import React from 'react';

import DocumentTitle from '../document-title';

import AppList from '../app-list';

import './style.css';

export const PageApplications = () => (
  <div className="page-applications">
    <DocumentTitle title="Applications" />
    <div className="o-layout-page-head">
      <div className="o-layout-fullwidth">
        <h1 className="o-heading-page">Applications</h1>
      </div>
    </div>
    <AppList />
  </div>
);

export default PageApplications;
