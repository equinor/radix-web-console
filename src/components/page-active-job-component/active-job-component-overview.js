import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Overview } from './overview';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import ActiveComponentSecrets from '../component/active-component-secrets';
import { ScheduledBatchList } from '../component/scheduled-batch-list';
import { ScheduledJobList } from '../component/scheduled-job-list';
import { EnvironmentVariables } from '../environment-variables';
import { ComponentModelValidationMap } from '../../models/component';
import { routes } from '../../routes';
import { getComponent } from '../../state/environment';
import { getEnvironmentScheduledBatches } from '../../state/environment-scheduled-batches';
import { getEnvironmentScheduledJobs } from '../../state/environment-scheduled-jobs';
import {
  subscribeApplication,
  subscribeEnvironment,
  subscribeEnvironmentScheduledBatches,
  subscribeEnvironmentScheduledJobs,
  unsubscribeApplication,
  unsubscribeEnvironment,
  unsubscribeEnvironmentScheduledBatches,
  unsubscribeEnvironmentScheduledJobs,
} from '../../state/subscriptions/action-creators';
import { getEnvsUrl } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

export class ActiveScheduledJobOverview extends Component {
  componentDidMount() {
    this.props.subscribe(
      this.props.appName,
      this.props.envName,
      this.props.jobComponentName
    );
  }

  componentDidUpdate(prevProps) {
    const { appName, envName, jobComponentName } = this.props;
    if (
      appName !== prevProps.appName ||
      envName !== prevProps.envName ||
      jobComponentName !== prevProps.jobComponentName
    ) {
      this.props.unsubscribe(
        prevProps.appName,
        prevProps.envName,
        prevProps.jobComponentName
      );
      this.props.subscribe(appName, envName, jobComponentName);
    }
  }

  componentWillUnmount() {
    this.props.unsubscribe(
      this.props.appName,
      this.props.envName,
      this.props.jobComponentName
    );
  }

  render() {
    const {
      appName,
      envName,
      jobComponentName,
      component,
      scheduledJobs,
      scheduledBatches,
    } = this.props;
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
                  hideRadixVars
                />
              </div>
              {scheduledJobs && (
                <div className="grid grid--gap-medium">
                  <ScheduledJobList
                    appName={appName}
                    envName={envName}
                    jobComponentName={jobComponentName}
                    scheduledJobList={scheduledJobs}
                    totalJobCount={0}
                    isExpanded={false}
                  />
                </div>
              )}
              {scheduledBatches && (
                <div className="grid grid--gap-medium">
                  <ScheduledBatchList
                    appName={appName}
                    envName={envName}
                    jobComponentName={jobComponentName}
                    scheduledBatchList={scheduledBatches}
                    isExpanded={false}
                  />
                </div>
              )}
              <div className="grid grid--gap-medium">
                <ActiveComponentSecrets
                  appName={appName}
                  componentName={jobComponentName}
                  envName={envName}
                  secrets={component.secrets}
                />
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
  component: PropTypes.shape(ComponentModelValidationMap),
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { jobComponentName }) => ({
  component: getComponent(state, jobComponentName),
  scheduledJobs: getEnvironmentScheduledJobs(state),
  scheduledBatches: getEnvironmentScheduledBatches(state),
});

const mapDispatchToProps = (dispatch) => ({
  subscribe: (appName, envName, jobComponentName) => {
    dispatch(subscribeEnvironment(appName, envName));
    dispatch(subscribeApplication(appName));
    dispatch(
      subscribeEnvironmentScheduledJobs(appName, envName, jobComponentName)
    );
    dispatch(
      subscribeEnvironmentScheduledBatches(appName, envName, jobComponentName)
    );
  },
  unsubscribe: (appName, envName, jobComponentName) => {
    dispatch(unsubscribeEnvironment(appName, envName));
    dispatch(unsubscribeApplication(appName));
    dispatch(
      unsubscribeEnvironmentScheduledJobs(appName, envName, jobComponentName)
    );
    dispatch(
      unsubscribeEnvironmentScheduledBatches(appName, envName, jobComponentName)
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveScheduledJobOverview);
