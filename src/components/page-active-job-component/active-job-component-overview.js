import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Alert from '../alert';

import DockerImage from '../docker-image';
import ScheduledJobStatus from '../scheduled-job-status';
import AsyncResource from '../async-resource';

import { getComponent } from '../../state/environment';
import { smallScheduledJobName } from '../../utils/string';
import * as routing from '../../utils/routing';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import componentModel from '../../models/component';
import RelativeToNow from '../time/relative-to-now';
import EnvVariables from '../env-variables';
import ComponentSecrets from '../component-secrets';
import ComponentPorts from '../component-ports';
import ComponentBredcrumb from '../active-component/component-bred-crumb';

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
                    {component.status === 'Stopped' && (
                      <Alert>
                        Job-scheduler has been manually stopped; please note
                        that new deployment will cause it to be restarted
                      </Alert>
                    )}
                    <p>
                      Status <strong>{component.status}</strong>
                    </p>
                    <p>
                      Image <DockerImage path={component.image} />
                    </p>
                    <ComponentPorts ports={component.ports} />
                    <EnvVariables component={component} />
                  </section>
                  <section>
                    <h2 className="o-heading-section">Scheduled Job</h2>
                    {component.scheduledJobList.map((scheduledJob) => (
                      <p key={scheduledJob.name}>
                        <Link
                          to={routing.getScheduledJobUrl(
                            appName,
                            envName,
                            jobComponentName,
                            scheduledJob.name
                          )}
                        >
                          {smallScheduledJobName(scheduledJob.name)}{' '}
                        </Link>
                        <ScheduledJobStatus status={scheduledJob.status} />
                        &nbsp;&nbsp;&nbsp;Created{' '}
                        <strong>
                          <RelativeToNow
                            time={scheduledJob.created}
                          ></RelativeToNow>
                        </strong>
                      </p>
                    ))}
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
