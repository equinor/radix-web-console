import React from 'react';
import { getApplicationList } from '../../state/applications';
import AppSummary from '../app-summary';

import { connect } from 'react-redux';

import './style.css';

export const AppList = ({ apps }) => (
  <React.Fragment>
    {apps.length > 0 && (
      <div>
        <div id="infoTab">
          <div className="desc" style={{ width: '200px' }}>
            Application
          </div>
          <div className="desc" style={{ width: '600px' }}>
            Enviornments
          </div>
        </div>

        {apps.map(app => (
          <div className="container" key={app.metadata.name}>
            <AppSummary app={app} />
          </div>
        ))}
      </div>
    )}
    {apps.length === 0 && '🐼 No apps yet 🐼'}
  </React.Fragment>
);

const mapStateToProps = state => ({
  apps: getApplicationList(state),
});

export default connect(mapStateToProps)(AppList);
