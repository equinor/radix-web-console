import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ComponentReplicaList } from './component-replica-list';
import { ComponentVulnerabilityDetails } from './component-vulnerability-details';
import { HorizontalScalingSummary } from './horizontal-scaling-summary';
import { OAuthService } from './oauth-service';
import { Overview } from './overview';
import Toolbar from '../component/toolbar';
import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import ActiveComponentSecrets from '../component/secrets/active-component-secrets';
import { EnvironmentVariables } from '../environment-variables';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../models/environment';
import { routes } from '../../routes';
import { getAppAlias } from '../../state/application';
import { getEnvironment } from '../../state/environment';
import {
  subscribeApplication,
  subscribeEnvironment,
  unsubscribeApplication,
  unsubscribeEnvironment,
} from '../../state/subscriptions/action-creators';
import { getEnvsUrl } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import { RootState } from '../../init/store';

import './style.css';

interface ActiveComponentOverviewState {
  appAlias?: {
    componentName: string;
    environmentName: string;
    url: string;
  };
  environment?: EnvironmentModel;
}

interface ActiveComponentOverviewDispatch {
  subscribe: (appName: string, envName: string) => void;
  unsubscribe: (appName: string, envName: string) => void;
}

interface ActiveComponentOverviewData {
  appAlias?: {
    componentName: string;
    environmentName: string;
    url: string;
  };
  appName: string;
  envName: string;
  componentName: string;
}

export interface ActiveComponentOverviewProps
  extends ActiveComponentOverviewState,
    ActiveComponentOverviewDispatch,
    ActiveComponentOverviewData {}

class ActiveComponentOverview extends Component<ActiveComponentOverviewProps> {
  static readonly propTypes: PropTypes.ValidationMap<ActiveComponentOverviewProps> =
    {
      appAlias: PropTypes.exact({
        componentName: PropTypes.string.isRequired,
        environmentName: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
      appName: PropTypes.string.isRequired,
      envName: PropTypes.string.isRequired,
      componentName: PropTypes.string.isRequired,
      environment: PropTypes.shape(
        EnvironmentModelValidationMap
      ) as PropTypes.Requireable<EnvironmentModel>,
      subscribe: PropTypes.func.isRequired,
      unsubscribe: PropTypes.func.isRequired,
    };

  override componentDidMount() {
    this.props.subscribe(this.props.appName, this.props.envName);
  }

  override componentDidUpdate(
    prevProps: Readonly<ActiveComponentOverviewProps>
  ) {
    const { appName, envName } = this.props;
    if (appName !== prevProps.appName || envName !== prevProps.envName) {
      this.props.unsubscribe(prevProps.appName, prevProps.envName);
      this.props.subscribe(appName, envName);
    }
  }

  override componentWillUnmount() {
    this.props.unsubscribe(this.props.appName, this.props.envName);
  }

  override render() {
    const { appAlias, appName, envName, componentName, environment } =
      this.props;
    const deployment = environment?.activeDeployment;
    const component = deployment?.components?.find(
      (component) => component.name === componentName
    );

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
          {component && deployment && (
            <>
              <Toolbar
                appName={appName}
                envName={envName}
                component={component}
                startEnabled
                stopEnabled
              />
              <Overview
                appAlias={appAlias}
                envName={envName}
                component={component}
                deployment={environment.activeDeployment}
              />
              <div className="grid grid--gap-medium">
                <ComponentReplicaList
                  title={'Replicas'}
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
                  secretNames={component.secrets}
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

function mapStateToProps(
  state: RootState,
  { componentName }: ActiveComponentOverviewData
): ActiveComponentOverviewState {
  return {
    appAlias: getAppAlias(state),
    environment: getEnvironment(state),
  };
}

function mapDispatchToProps(
  dispatch: Dispatch
): ActiveComponentOverviewDispatch {
  return {
    subscribe: (appName, envName) => {
      dispatch(subscribeEnvironment(appName, envName));
      dispatch(subscribeApplication(appName));
    },
    unsubscribe: (appName, envName) => {
      dispatch(unsubscribeEnvironment(appName, envName));
      dispatch(unsubscribeApplication(appName));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveComponentOverview);
