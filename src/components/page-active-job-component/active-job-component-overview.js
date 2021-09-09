import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ScheduledJobList from './scheduled-job-list';
import Overview from './overview';

import AsyncResource from '../async-resource';
import Breadcrumb from '../breadcrumb';
import ActiveComponentSecrets from '../component/active-component-secrets';
import EnvironmentVariables from '../environment-variables';

import componentModel from '../../models/component';
import routes from '../../routes';
import { getComponent } from '../../state/environment';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import { routeWithParams } from '../../utils/string';
import * as routing from '../../utils/routing';

export class ActiveScheduledJobOverview extends React.Component {
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
    const { appName, envName, jobComponentName, component } = this.props;

    return (
      <>
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Environments', to: routing.getEnvsUrl(appName) },
            {
              label: envName,
              to: routeWithParams(routes.appEnvironment, {
                appName,
                envName,
              }),
            },
            { label: jobComponentName },
          ]}
        />
        <AsyncResource
          resource="ENVIRONMENT"
          resourceParams={[appName, envName]}
        >
          {component && (
            <>
              <Overview component={component} />
              <div className="grid grid--gap-medium">
                <EnvironmentVariables
                  appName={appName}
                  envName={envName}
                  componentName={jobComponentName}
                  componentType={component.type}
                  includeRadixVars={false}
                  readonly={false}
                />
              </div>
              <div className="grid grid--gap-medium">
                <ScheduledJobList
                  appName={appName}
                  envName={envName}
                  jobComponentName={jobComponentName}
                  scheduledJobList={component.scheduledJobList}
                ></ScheduledJobList>
              </div>
              <div className="grid grid--gap-medium">
                <ActiveComponentSecrets
                  appName={appName}
                  componentName={jobComponentName}
                  envName={envName}
                  secrets={component.secrets}
                ></ActiveComponentSecrets>
              </div>
            </>
          )}
        </AsyncResource>
      </>
    );
  }
}

ActiveScheduledJobOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  component: PropTypes.shape(componentModel),
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { jobComponentName }) => ({
  component: getComponent(state, jobComponentName),
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
)(ActiveScheduledJobOverview);
