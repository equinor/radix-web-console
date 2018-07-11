import React from 'react';
import { getApplicationList } from '../../state/applications';
import AppSummary from '../app-summary';

import { connect } from 'react-redux';

import './style.css';

export const AppList = ({ apps }) => (
  <div className="app-list">
    {apps.length > 0 && (
      <div>
        <div className="app-list__header">
          <div className="app-list__desc app-list__desc--app">Application</div>
          <div className="app-list__desc app-list__desc--env">Environments</div>
        </div>

        {apps.map(app => (
          <div className="container" key={app.metadata.name}>
            <AppSummary app={app} />
          </div>
        ))}
      </div>
    )}
    {apps.length === 0 && '🐼 No apps yet 🐼'}
  </div>
);

const mapStateToProps = state => ({
  apps: getApplicationList(state),
});

export default connect(mapStateToProps)(AppList);
