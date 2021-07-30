import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import AsyncResource from '../async-resource';
import { getComponent } from '../../state/environment';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import componentModel from '../../models/component';
import EnvironmentVariables from '../environment-variables';
import ComponentBreadCrumb from '../component/component-bread-crumb';
import ScheduledJobList from './scheduled-job-list';
import Overview from './overview';
import ActiveComponentSecrets from '../component/active-component-secrets';

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
      <React.Fragment>
        <ComponentBreadCrumb
          appName={appName}
          componentName={jobComponentName}
          envName={envName}
        />
        <main>
          <AsyncResource
            resource="ENVIRONMENT"
            resourceParams={[appName, envName]}
          >
            {component && (
              <React.Fragment>
                <div className="o-layout-columns">
                  <section>
                    <Overview component={component} />
                  </section>
                  <section>
                    <EnvironmentVariables
                      appName={appName}
                      envName={envName}
                      componentName={jobComponentName}
                      componentType={component.type}
                      includeRadixVars={false}
                    />
                  </section>
                  <section>
                    <ScheduledJobList
                      appName={appName}
                      envName={envName}
                      jobComponentName={jobComponentName}
                      scheduledJobList={component.scheduledJobList}
                    />
                  </section>
                  <section>
                    <ActiveComponentSecrets
                      appName={appName}
                      componentName={jobComponentName}
                      envName={envName}
                      secrets={component.secrets}
                    />
                  </section>
                </div>
              </React.Fragment>
            )}
          </AsyncResource>
        </main>
      </React.Fragment>
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
