import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { DefaultAppAlias, DefaultAppAliasProps } from './default-app-alias';

import ApplicationCost from '../application-cost';
import { FutureApplicationCost } from '../application-future-cost';
import AsyncResource from '../async-resource';
import { EnvironmentsSummary } from '../environments-summary';
import { JobsList } from '../jobs-list';
import {
  ApplicationModel,
  ApplicationModelValidationMap,
} from '../../models/application';
import { getAppAlias, getMemoizedApplication } from '../../state/application';
import {
  subscribeApplication,
  unsubscribeApplication,
} from '../../state/subscriptions/action-creators';
import { RootState } from '../../init/store';
import { mapRouteParamsToProps } from '../../utils/routing';

import './style.css';

const LATEST_JOBS_LIMIT: number = 5;

interface AppOverviewDispatch {
  subscribeApplication: (appName: string) => void;
  unsubscribeApplication: (appName: string) => void;
}

interface AppOverviewState extends Pick<DefaultAppAliasProps, 'appAlias'> {
  application: ApplicationModel;
}

export interface AppOverviewProps
  extends AppOverviewDispatch,
    AppOverviewState {
  appName: string;
}

export class AppOverview extends Component<AppOverviewProps> {
  static readonly propTypes: PropTypes.ValidationMap<AppOverviewProps> = {
    appName: PropTypes.string.isRequired,
    appAlias: PropTypes.exact({
      componentName: PropTypes.string.isRequired,
      environmentName: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
    application: PropTypes.shape(ApplicationModelValidationMap)
      .isRequired as PropTypes.Validator<ApplicationModel>,
    subscribeApplication: PropTypes.func.isRequired,
    unsubscribeApplication: PropTypes.func.isRequired,
  };

  constructor(props: AppOverviewProps) {
    super(props);
    props.subscribeApplication(this.props.appName);
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
      application: { environments, jobs, registration },
      appAlias,
      appName,
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

            {environments.length > 0 && (
              <Typography variant="h4">Environments</Typography>
            )}
            <EnvironmentsSummary
              appName={appName}
              envs={environments}
              repository={registration.repository}
            />

            {jobs.length > 0 && (
              <Typography variant="h4">Latest pipeline jobs</Typography>
            )}
            <JobsList jobs={jobs} appName={appName} limit={LATEST_JOBS_LIMIT} />
          </AsyncResource>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state: RootState): AppOverviewState {
  return {
    appAlias: getAppAlias(state),
    application: { ...getMemoizedApplication(state) },
  };
}

function mapDispatchToProps(dispatch: Dispatch): AppOverviewDispatch {
  return {
    subscribeApplication: (appName) => dispatch(subscribeApplication(appName)),
    unsubscribeApplication: (appName) =>
      dispatch(unsubscribeApplication(appName)),
  };
}

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(AppOverview)
);
