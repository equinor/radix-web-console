import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component as ClassComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { DefaultAppAlias } from './default-app-alias';
import { DNSAlias } from './dns-alias';
import { Alert } from '../alert';
import ApplicationCost from '../application-cost';
import { FutureApplicationCost } from '../application-future-cost';
import AsyncResource from '../async-resource';
import { EnvironmentsSummary } from '../environments-summary';
import { JobsList } from '../jobs-list';
import { clusterBases } from '../../clusterBases';
import { RootState } from '../../init/store';
import {
  ApplicationModel,
  ApplicationModelValidationMap,
} from '../../models/radix-api/applications/application';
import { getMemoizedApplication } from '../../state/application';
import {
  subscribeApplication,
  unsubscribeApplication,
} from '../../state/subscriptions/action-creators';
import { configVariables } from '../../utils/config';
import { connectRouteParams, routeParamLoader } from '../../utils/router';

const LATEST_JOBS_LIMIT = 5;

interface AppOverviewDispatch {
  subscribeApplication: (name: string) => void;
  unsubscribeApplication: (name: string) => void;
}

interface AppOverviewState {
  application: ApplicationModel;
}

export interface AppOverviewProps
  extends AppOverviewDispatch,
    AppOverviewState {
  appName: string;
}

export class AppOverview extends ClassComponent<AppOverviewProps> {
  static readonly propTypes: PropTypes.ValidationMap<AppOverviewProps> = {
    appName: PropTypes.string.isRequired,
    application: PropTypes.shape(ApplicationModelValidationMap)
      .isRequired as PropTypes.Validator<ApplicationModel>,
    subscribeApplication: PropTypes.func.isRequired,
    unsubscribeApplication: PropTypes.func.isRequired,
  };

  private readonly isPlayground =
    configVariables.RADIX_CLUSTER_BASE === clusterBases.playgroundWebConsole;

  constructor(props: AppOverviewProps) {
    super(props);
    props.subscribeApplication(props.appName);
  }

  override componentWillUnmount() {
    this.props.unsubscribeApplication(this.props.appName);
  }

  override componentDidUpdate(prevProps: Readonly<AppOverviewProps>) {
    const { appName } = this.props;
    if (appName !== prevProps.appName) {
      this.props.unsubscribeApplication(prevProps.appName);
      this.props.subscribeApplication(appName);
    }
  }

  override render() {
    const {
      appName,
      application: { appAlias, dnsAlias, environments, jobs, registration },
    } = this.props;

    return (
      <main className="grid grid--gap-medium">
        <AsyncResource resource="APP" resourceParams={[appName]}>
          {this.isPlayground && (
            <Alert type="warning">
              <Typography>
                Applications in Playground that has not had any deployments or
                been restarted in the last 7 days will be stopped. The
                application will be automatically deleted after another 21 days
                of inactivity.
              </Typography>
            </Alert>
          )}

          <div className="grid grid--gap-medium grid--overview-columns">
            <ApplicationCost appName={appName} />
            <FutureApplicationCost appName={appName} />
          </div>

          {appAlias && (
            <DefaultAppAlias appName={appName} appAlias={appAlias} />
          )}
          {dnsAlias && <DNSAlias appName={appName} dnsAlias={dnsAlias} />}

          {environments?.length > 0 && (
            <Typography variant="h4">Environments</Typography>
          )}
          <EnvironmentsSummary
            appName={appName}
            envs={environments}
            repository={registration.repository}
          />
          {jobs?.length > 0 && (
            <Typography variant="h4">Latest pipeline jobs</Typography>
          )}
          <JobsList appName={appName} jobs={jobs} limit={LATEST_JOBS_LIMIT} />
        </AsyncResource>
      </main>
    );
  }
}

function mapStateToProps(state: RootState): AppOverviewState {
  return { application: { ...getMemoizedApplication(state) } };
}

function mapDispatchToProps(dispatch: Dispatch): AppOverviewDispatch {
  return {
    subscribeApplication: (name) => dispatch(subscribeApplication(name)),
    unsubscribeApplication: (name) => dispatch(unsubscribeApplication(name)),
  };
}

const ConnectedAppOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppOverview);

const Component = connectRouteParams(ConnectedAppOverview);
export { Component, routeParamLoader as loader };

export default ConnectedAppOverview;
