import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import AsyncResource from '../async-resource';
import Toolbar from './toolbar';
import { getAppAlias } from '../../state/application';
import { getComponent } from '../../state/environment';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import componentModel from '../../models/component';
import EnvVariables from '../component/env-variables';
import HorizontalScalingSummary from './horizontal-scaling-summary';
import ReplicaList from './replica-list';
import ComponentBreadCrumb from '../component/component-bread-crumb';
import Overview from './overview';
import ActiveComponentSecrets from '../component/active-component-secrets';

export class ActiveComponentOverview extends React.Component {
  componentDidMount() {
    this.props.subscribe(this.props.appName, this.props.envName);
  }
  componentDidUpdate(prevProps) {
    const { appName, envName } = this.props;

    if (appName !== prevProps.appName || envName !== prevProps.envName) {
      this.props.unsubscribe(prevProps.appName, prevProps.envName);
      this.props.subscribe(appName, envName);
    }
  }

  componentWillUnmount() {
    this.props.unsubscribe(this.props.appName, this.props.envName);
  }

  render() {
    const { appAlias, appName, envName, componentName, component } = this.props;
    return (
      <React.Fragment>
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
              <div className="grid grid--gap-x-large">
                <Overview
                  appAlias={appAlias}
                  envName={envName}
                  componentName={componentName}
                  component={component}
                />
                <div className="grid grid--gap-medium">
                  <ReplicaList
                    appName={appName}
                    envName={envName}
                    componentName={componentName}
                    replicaList={component.replicaList}
                  />
                </div>
                <div className="grid grid--gap-medium">
                  <ActiveComponentSecrets
                    appName={appName}
                    componentName={componentName}
                    envName={envName}
                    secrets={component.secrets}
                  />
                </div>
                <div className="grid grid--gap-medium">
                  <EnvVariables component={component} includeRadixVars={true} />
                </div>
                <div>
                  <HorizontalScalingSummary component={component} />
                </div>
              </div>
            </React.Fragment>
          )}
        </AsyncResource>
      </React.Fragment>
    );
  }
}

ActiveComponentOverview.propTypes = {
  appAlias: PropTypes.exact({
    componentName: PropTypes.string.isRequired,
    environmentName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  component: PropTypes.shape(componentModel),
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { componentName }) => ({
  appAlias: getAppAlias(state),
  component: getComponent(state, componentName),
});

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
)(ActiveComponentOverview);
