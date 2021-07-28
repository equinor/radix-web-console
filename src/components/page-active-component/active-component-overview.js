import PropTypes from 'prop-types';
import React from 'react';

import EnvironmentVariables from '../environment-variables';
import ActiveComponentOverviewMain from './active-component-overview-main';

const ActiveComponentOverview = (props) => {
  const { appName, envName, componentName } = props;
  return (
    <React.Fragment>
      <div className="o-layout-constrained">
        <ActiveComponentOverviewMain
          appName={appName}
          componentName={componentName}
          envName={envName}
        />
      </div>
      <div className="env_variables">
        <EnvironmentVariables
          appName={appName}
          envName={envName}
          componentName={componentName}
          includeRadixVars={true}
        />
      </div>
    </React.Fragment>
  );
};

ActiveComponentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default ActiveComponentOverview;
