import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import HorizontalScalingSummary from './horizontal-scaling-summary';
import Overview from './overview';
import ReplicaList from './replica-list';
import Toolbar from './toolbar';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import ActiveComponentSecrets from '../component/active-component-secrets';
import { EnvironmentVariables } from '../environment-variables';
import componentModel from '../../models/component';
import { routes } from '../../routes';
import { getAppAlias } from '../../state/application';
import { getComponent } from '../../state/environment';
import {
  subscribeApplication,
  subscribeEnvironment,
  unsubscribeApplication,
  unsubscribeEnvironment,
} from '../../state/subscriptions/action-creators';
import { getEnvsUrl } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

export class ActiveComponentOverview extends Component {
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
      <>
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Environments', to: getEnvsUrl(appName) },
            {
              label: envName,
              to: routeWithParams(routes.appEnvironment, { appName, envName }),
            },
            { label: componentName },
          ]}
        />
        <AsyncResource
          resource="ENVIRONMENT"
          resourceParams={[appName, envName]}
        >
          {component && (
            <>
              <Toolbar
                appName={appName}
                envName={envName}
                component={component}
              />
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
              <div className="secrets_list">
                <ActiveComponentSecrets
                  appName={appName}
                  componentName={componentName}
                  envName={envName}
                  secrets={component.secrets}
                />
              </div>
              <div className="grid grid--gap-medium">
                <EnvironmentVariables
                  appName={appName}
                  envName={envName}
                  componentName={componentName}
                  componentType={component.type}
                  includeRadixVars={true}
                  readonly={false}
                />
              </div>
              <HorizontalScalingSummary
                data={component.horizontalScalingSummary}
              />
            </>
          )}
        </AsyncResource>
      </>
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
    dispatch(subscribeEnvironment(appName, envName));
    dispatch(subscribeApplication(appName));
  },
  unsubscribe: (appName, envName) => {
    dispatch(unsubscribeEnvironment(appName, envName));
    dispatch(unsubscribeApplication(appName));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveComponentOverview);
