import React from 'react';
import { connect } from 'react-redux';

import { getApplicationList } from '../../state/applications';
import AppSummary from '../app-summary';
import './style.css';

const appSorter = (a, b) => a.metadata.name.localeCompare(b.metadata.name);

export const AppList = ({ apps }) => (
  <article className="app-list">
    {apps.length > 0 &&
      apps
        .sort(appSorter)
        .map(app => <AppSummary app={app} key={app.metadata.name} />)}
    {apps.length === 0 && '🐼 No apps yet 🐼'}
  </article>
);

const mapStateToProps = state => ({
  apps: getApplicationList(state),
});

export default connect(mapStateToProps)(AppList);
