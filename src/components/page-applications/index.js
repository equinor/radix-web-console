import React from 'react';
import { Link } from 'react-router-dom';

import DocumentTitle from '../document-title';
import routes from '../../routes';

import AppList from '../app-list';

export const PageApplications = () => (
  <React.Fragment>
    <DocumentTitle title="Applications" />
    <div className="o-layout-page-head">
      <div className="o-layout-fullwidth">
        <h1 className="o-heading-page">Applications</h1>
        <Link to={routes.appCreate}>Create an app</Link>
      </div>
    </div>
    <AppList />
  </React.Fragment>
);

export default PageApplications;
