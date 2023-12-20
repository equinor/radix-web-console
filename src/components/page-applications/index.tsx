import { FunctionComponent } from 'react';

import AppList from '../app-list';
import { DocumentTitle } from '../document-title';

import './style.css';

export const PageApplications: FunctionComponent = () => (
  <div className="o-layout-single applications">
    <DocumentTitle title="Applications" />

    <AppList />
  </div>
);

export { PageApplications as Component };
