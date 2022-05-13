import DocumentTitle from '../document-title';
import PipelineRun from '../pipeline-run';
import routes from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';
import { Breadcrumb } from '../breadcrumb';
import { routeWithParams, smallPipelineRunName } from '../../utils/string';
import { RootState } from '../../init/store';
import {
  subscribePipelineRun,
  unsubscribePipelineRun,
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
import { PageStepsProps } from '../page-step';

export interface PagePipelineRunSubscription {
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

export interface PagePipelineRunProps extends PagePipelineRunSubscription {
  appName: string;
  jobName: string;
  pipelineRunName: string;
  pipelineRun?: PipelineRunModel;
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
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  };

  private interval;

  constructor(props: PagePipelineRunProps) {
    super(props);
    this.state = { now: new Date() };
  }

  isPipelineRunRunning = (pipelineRun: any) =>
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

  override componentDidUpdate(prevProps: PagePipelineRunProps) {
    const { subscribe, unsubscribe, appName, jobName, pipelineRunName } =
      this.props;

    if (prevProps.jobName !== jobName || prevProps.appName !== appName) {
      unsubscribe(appName, prevProps.jobName, prevProps.pipelineRunName);
      subscribe(appName, jobName, pipelineRunName);
    }

    this.configureTimerInterval(pipelineRun);
  }

  configureTimerInterval(pipelineRun) {
    clearInterval(this.interval);
    if (this.isPipelineRunRunning(pipelineRun)) {
      this.interval = setInterval(
        () => this.setState({ now: new Date() }),
        1000
      );
    }
  }

  override render() {
    const { appName, jobName, pipelineRunName, pipelineRun } = this.props;
    return (
      <>
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            {
              label: 'Pipeline Runs',
              to: routeWithParams(
                routes.appPipelineRuns,
                { appName },
                { jobName }
              ),
            },
            { label: smallPipelineRunName(jobName) },
          ]}
        />
        <DocumentTitle title={`Pipeline Run ${pipelineRunName}`} />
        <AsyncResource
          resource="PIPELINE_RUN"
          resourceParams={[appName, jobName, jobName]}
        >
          <PipelineRun pipelineRun={pipelineRun} />
        </AsyncResource>
      </>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  pipelineRun: getPipelineRun(state),
});

const mapDispatchToProps = (
  dispatch: Dispatch
): PagePipelineRunSubscription => ({
  subscribe: (appName, jobName, pipelineRunName) => {
    dispatch(subscribePipelineRun(appName, jobName, pipelineRunName));
  },
  unsubscribe: (appName, jobName, pipelineRunName) => {
    dispatch(unsubscribePipelineRun(appName, jobName, pipelineRunName));
  },
});

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'pipelineRunName'],
  connect(mapStateToProps, mapDispatchToProps)(PagePipelineRun)
);
