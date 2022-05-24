import DocumentTitle from '../document-title';
import PipelineRun from '../pipeline-run';
import routes from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';
import { Breadcrumb } from '../breadcrumb';
import { routeWithParams, smallJobName } from '../../utils/string';
import { RootState } from '../../init/store';
import {
  subscribePipelineRun,
  subscribePipelineRunTasks,
  unsubscribePipelineRun,
  unsubscribePipelineRunTasks,
} from '../../state/subscriptions/action-creators';
import { connect } from 'react-redux';
import AsyncResource from '../async-resource';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { Dispatch } from 'redux';
import pipelineRun from '../pipeline-run';
import { getPipelineRun } from '../../state/pipeline-run';
import {
  PipelineRunModel,
  PipelineRunModelValidationMap,
} from '../../models/pipeline-run';
import { getPipelineRunTasks } from '../../state/pipeline-run-tasks';
import { PipelineRunTasks } from '../pipeline-run-tasks';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../../models/pipeline-run-task';
import { Typography } from '@equinor/eds-core-react';

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
    ) as PropTypes.Requireable<PipelineRunModel>,
    tasks: PropTypes.arrayOf(
      PropTypes.shape(
        PipelineRunTaskModelValidationMap
      ) as PropTypes.Requireable<PipelineRunTaskModel>
    ),
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  };

  private interval;

  constructor(props: PagePipelineRunProps) {
    super(props);
    this.state = { now: new Date() };
  }

  isPipelineRunRunning = (pipelineRun: PipelineRunModel): boolean =>
    pipelineRun && !pipelineRun.ended && pipelineRun.started;

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

    this.configureTimerInterval(pipelineRun);
  }

  configureTimerInterval(pipelineRun: PipelineRunModel): void {
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
              label: 'Run pipelines',
              to: routeWithParams(routes.appJobStep, {
                appName,
                jobName,
                stepName: 'run-pipelines',
              }),
            },
            { label: pipelineRun?.env + ':' + pipelineRun?.name },
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
            ></PipelineRunTasks>
          </AsyncResource>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </>
    );
  }
}
const mapStateToProps = (state: RootState): PagePipelineRunState => ({
  pipelineRun: getPipelineRun(state),
  tasks: getPipelineRunTasks(state),
});

const mapDispatchToProps = (dispatch: Dispatch): PageSubscription => ({
  subscribe: (appName, jobName, pipelineRunName) => {
    dispatch(subscribePipelineRun(appName, jobName, pipelineRunName));
    dispatch(subscribePipelineRunTasks(appName, jobName, pipelineRunName));
  },
  unsubscribe: (appName, jobName, pipelineRunName) => {
    dispatch(unsubscribePipelineRun(appName, jobName, pipelineRunName));
    dispatch(unsubscribePipelineRunTasks(appName, jobName, pipelineRunName));
  },
});

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'pipelineRunName'],
  connect(mapStateToProps, mapDispatchToProps)(PagePipelineRun)
);
