import React from 'react';

import { getApplicationList } from '../../state/applications';
import AppSummary from '../app-summary';

import { connect } from 'react-redux';

const appSorter = (a, b) => a.metadata.name.localeCompare(b.metadata.name);

export const AppList = ({ apps }) => (
  <article>
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
