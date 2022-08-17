import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { PipelineRun } from '../pipeline-run';
import { PipelineRunTasks } from '../pipeline-run-tasks';
import { RootState } from '../../init/store';
import {
  PipelineRunModel,
  PipelineRunModelValidationMap,
} from '../../models/pipeline-run';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../../models/pipeline-run-task';
import { routes } from '../../routes';
import { getMemoizedPipelineRun } from '../../state/pipeline-run';
import { getPipelineRunTasks } from '../../state/pipeline-run-tasks';
import {
  subscribePipelineRun,
  subscribePipelineRunTasks,
  unsubscribePipelineRun,
  unsubscribePipelineRunTasks,
} from '../../state/subscriptions/action-creators';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallJobName } from '../../utils/string';

export interface PageSubscription {
  subscribe: (
    appName: string,
    jobName: string,
    pipelineRunName: string
  ) => void;
  unsubscribe: (
    appName: string,
    jobName: string,
    pipelineRunName: string
  ) => void;
}

export interface PagePipelineRunState {
  pipelineRun?: PipelineRunModel;
  tasks?: Array<PipelineRunTaskModel>;
}

export interface PagePipelineRunProps
  extends PageSubscription,
    PagePipelineRunState {
  appName: string;
  jobName: string;
  pipelineRunName: string;
}

export class PagePipelineRun extends Component<
  PagePipelineRunProps,
  { now: Date }
> {
  static readonly propTypes: PropTypes.ValidationMap<PagePipelineRunProps> = {
    appName: PropTypes.string.isRequired,
    jobName: PropTypes.string.isRequired,
    pipelineRunName: PropTypes.string.isRequired,
    pipelineRun: PropTypes.shape(
      PipelineRunModelValidationMap
    ) as PropTypes.Validator<PipelineRunModel>,
    tasks: PropTypes.arrayOf(
      PropTypes.shape(
        PipelineRunTaskModelValidationMap
      ) as PropTypes.Validator<PipelineRunTaskModel>
    ),
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  };

  private interval: NodeJS.Timer;

  constructor(props: PagePipelineRunProps) {
    super(props);
    this.state = { now: new Date() };
  }

  isPipelineRunRunning = (pipelineRun: PipelineRunModel): boolean =>
    pipelineRun && !pipelineRun.ended && !!pipelineRun.started;

  override componentDidMount() {
    const { subscribe, appName, jobName, pipelineRunName } = this.props;
    subscribe(appName, jobName, pipelineRunName);
    this.interval = setInterval(() => this.setState({ now: new Date() }), 1000);
  }

  override componentWillUnmount() {
    const { unsubscribe, appName, jobName, pipelineRunName } = this.props;
    unsubscribe(appName, jobName, pipelineRunName);
    clearInterval(this.interval);
  }

  override componentDidUpdate(prevProps: Readonly<PagePipelineRunProps>) {
    const { subscribe, unsubscribe, appName, jobName, pipelineRunName } =
      this.props;

    if (prevProps.jobName !== jobName || prevProps.appName !== appName) {
      unsubscribe(appName, prevProps.jobName, prevProps.pipelineRunName);
      subscribe(appName, jobName, pipelineRunName);
    }

    this.configureTimerInterval(this.props.pipelineRun);
  }

  configureTimerInterval(pipelineRun?: PipelineRunModel): void {
    clearInterval(this.interval);
    if (this.isPipelineRunRunning(pipelineRun)) {
      this.interval = setInterval(
        () => this.setState({ now: new Date() }),
        1000
      );
    }
  }

  override render() {
    const { appName, jobName, pipelineRunName, pipelineRun, tasks } =
      this.props;
    return (
      <>
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            {
              label: 'Pipeline Jobs',
              to: routeWithParams(routes.appJobs, { appName }),
            },
            {
              label: smallJobName(jobName),
              to: routeWithParams(routes.appJob, { appName, jobName }),
            },
            {
              label: 'Run sub-pipeline',
              to: routeWithParams(routes.appJobStep, {
                appName,
                jobName,
                stepName: 'run-pipelines',
              }),
            },
            {
              label: pipelineRun
                ? `${pipelineRun.env}:${pipelineRun.name}`
                : '',
            },
          ]}
        />
        <DocumentTitle title={`Pipeline Run ${pipelineRunName}`} />
        <AsyncResource
          resource="PIPELINE_RUN"
          resourceParams={[appName, jobName, pipelineRunName]}
        >
          <PipelineRun pipelineRun={pipelineRun} />
        </AsyncResource>
        <DocumentTitle title={`Tasks`} />
        {pipelineRun && tasks ? (
          <AsyncResource
            resource="PIPELINE_RUN_TASKS"
            resourceParams={[appName, jobName, pipelineRunName]}
          >
            <PipelineRunTasks
              appName={appName}
              jobName={jobName}
              pipelineRun={pipelineRun}
              tasks={tasks}
            />
          </AsyncResource>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </>
    );
  }
}

function mapStateToProps(state: RootState): PagePipelineRunState {
  return {
    pipelineRun: getMemoizedPipelineRun(state),
    tasks: getPipelineRunTasks(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): PageSubscription {
  return {
    subscribe: (appName, jobName, pipelineRunName) => {
      dispatch(subscribePipelineRun(appName, jobName, pipelineRunName));
      dispatch(subscribePipelineRunTasks(appName, jobName, pipelineRunName));
    },
    unsubscribe: (appName, jobName, pipelineRunName) => {
      dispatch(unsubscribePipelineRun(appName, jobName, pipelineRunName));
      dispatch(unsubscribePipelineRunTasks(appName, jobName, pipelineRunName));
    },
  };
}

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'pipelineRunName'],
  connect(mapStateToProps, mapDispatchToProps)(PagePipelineRun)
);
