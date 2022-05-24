import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import { ComponentReplicaList } from './component-replica-list';
import { ComponentVulnerabilityDetails } from './component-vulnerability-details';
import { HorizontalScalingSummary } from './horizontal-scaling-summary';
import { OAuthService } from './oauth-service';
import { Overview } from './overview';
import Toolbar from './toolbar';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import ActiveComponentSecrets from '../component/active-component-secrets';
import { EnvironmentVariables } from '../environment-variables';
import { ComponentModelValidationMap } from '../../models/component';
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

import './style.css';

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
                component={component}
              />
              <div className="grid grid--gap-medium">
                <ComponentReplicaList
                  appName={appName}
                  envName={envName}
                  componentName={componentName}
                  replicaList={component.replicaList}
                />
              </div>
              <ComponentVulnerabilityDetails
                appName={appName}
                envName={envName}
                componentName={componentName}
              />
              {component.oauth2 && (
                <div className="grid grid--gap-medium">
                  <OAuthService
                    appName={appName}
                    envName={envName}
                    componentName={componentName}
                    oauth2={component.oauth2}
                  />
                </div>
              )}
              <div>
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
  component: PropTypes.shape(ComponentModelValidationMap),
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
