import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Alert from '../alert';

import DockerImage from '../docker-image';
import AsyncResource from '../async-resource';

import { getComponent } from '../../state/environment';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import componentModel from '../../models/component';
import EnvVariables from '../active-component/env-variables';
import ComponentSecrets from '../active-component/component-secrets';
import ComponentPorts from '../active-component/component-ports';
import ComponentBredcrumb from '../active-component/component-bred-crumb';
import ScheduledJobList from './scheduled-job-list';

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
        <ComponentBredcrumb
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
                    <h2 className="o-heading-section">Overview</h2>
                    <p>
                      Job <strong>{component.name}</strong>
                    </p>
                    <p>
                      Image <DockerImage path={component.image} />
                    </p>
                    <ComponentPorts ports={component.ports} />
                    <p>
                      Job-scheduler status <strong>{component.status}</strong>
                    </p>
                    {component.status !== 'Consistent' && (
                      <Alert>
                        Job-scheduler has been manually stopped; please note
                        that new deployment will cause it to be restarted
                      </Alert>
                    )}
                    <EnvVariables component={component} />
                  </section>
                  <section>
                    <ScheduledJobList
                      appName={appName}
                      envName={envName}
                      jobComponentName={jobComponentName}
                      scheduledJobList={component.scheduledJobList}
                    ></ScheduledJobList>
                    <ComponentSecrets
                      appName={appName}
                      componentName={jobComponentName}
                      envName={envName}
                      secrets={component.secrets}
                    ></ComponentSecrets>
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
