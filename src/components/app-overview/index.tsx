import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component as ClassComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { DefaultAppAlias } from './default-app-alias';

import ApplicationCost from '../application-cost';
import { FutureApplicationCost } from '../application-future-cost';
import AsyncResource from '../async-resource';
import { EnvironmentsSummary } from '../environments-summary';
import { JobsList } from '../jobs-list';
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
import { connectRouteParams, routeParamLoader } from '../../utils/router';

import './style.css';

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
      application: { appAlias, environments, jobs, registration },
    } = this.props;

    return (
      <div className="app-overview">
        <main className="grid grid--gap-medium">
          <AsyncResource resource="APP" resourceParams={[appName]}>
            <div className="grid grid--gap-medium grid--overview-columns">
              <div className="grid grid--gap-medium">
                <ApplicationCost appName={appName} />
              </div>
              <div className="grid grid--gap-medium">
                <FutureApplicationCost appName={appName} />
              </div>
            </div>

            {appAlias && (
              <DefaultAppAlias appName={appName} appAlias={appAlias} />
            )}

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
      </div>
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
