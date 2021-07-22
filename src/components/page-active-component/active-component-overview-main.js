import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import AsyncResource from '../async-resource';
import Toolbar from './toolbar';
import { getAppAlias } from '../../state/application';
import { getComponent } from '../../state/environment';
import componentModel from '../../models/component';
import HorizontalScalingSummary from './horizontal-scaling-summary';
import ReplicaList from './replica-list';
import ComponentBreadCrumb from '../component/component-bread-crumb';
import Overview from './overview';
import ActiveComponentSecrets from '../component/active-component-secrets';

const ActiveComponentOverviewMain = (props) => {
  const { appAlias, appName, envName, componentName, component } = props;
  return (
    <React.Fragment>
      <div className="o-layout-constrained">
        <ComponentBreadCrumb
          appName={appName}
          componentName={componentName}
          envName={envName}
        />
        <AsyncResource
          resource="ENVIRONMENT"
          resourceParams={[appName, envName]}
        >
          {component && (
            <React.Fragment>
              <Toolbar
                appName={appName}
                envName={envName}
                component={component}
              />
              <div className="env__content">
                <div className="grid">
                  <Overview
                    appAlias={appAlias}
                    envName={envName}
                    componentName={componentName}
                    component={component}
                  />
                </div>
                <div>
                  <ReplicaList
                    appName={appName}
                    envName={envName}
                    componentName={componentName}
                    replicaList={component.replicaList}
                  />
                </div>
                <div>
                  <ActiveComponentSecrets
                    appName={appName}
                    componentName={componentName}
                    envName={envName}
                    secrets={component.secrets}
                  />
                </div>
                <div>
                  <HorizontalScalingSummary component={component} />
                </div>
              </div>
            </React.Fragment>
          )}
        </AsyncResource>
      </div>
    </React.Fragment>
  );
};

ActiveComponentOverviewMain.propTypes = {
  appAlias: PropTypes.exact({
    componentName: PropTypes.string.isRequired,
    environmentName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  component: PropTypes.shape(componentModel),
  // subscribe: PropTypes.func.isRequired,
  // unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { componentName }) => ({
  appAlias: getAppAlias(state),
  component: getComponent(state, componentName),
});

/*
const mapDispatchToProps = (dispatch) => ({
  subscribe: (appName, envName) => {
    dispatch(subscriptionActions.subscribeEnvironment(appName, envName));
    dispatch(subscriptionActions.subscribeApplication(appName));
  },
  unsubscribe: (appName, envName) => {
    dispatch(subscriptionActions.unsubscribeEnvironment(appName, envName));
    dispatch(subscriptionActions.unsubscribeApplication(appName));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveComponentOverviewMain);
*/
export default connect(mapStateToProps)(ActiveComponentOverviewMain);
