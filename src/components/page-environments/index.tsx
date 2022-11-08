import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { EnvironmentsSummary } from '../environments-summary';
import { RootState } from '../../init/store';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../../models/environment-summary';
import { routes } from '../../routes';
import { getEnvironmentSummaries } from '../../state/application';
import * as actions from '../../state/subscriptions/action-creators';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

interface PageEnvironmentsState {
  envs: Array<EnvironmentSummaryModel>;
}

interface PageEnvironmentsDispatch {
  subscribeApplication: (appName: string) => void;
  unsubscribeApplication: (appName: string) => void;
}

export interface PageEnvironmentsProps
  extends PageEnvironmentsState,
    PageEnvironmentsDispatch {
  appName: string;
}

class PageEnvironments extends Component<PageEnvironmentsProps> {
  static readonly propTypes: PropTypes.ValidationMap<PageEnvironmentsProps> = {
    appName: PropTypes.string.isRequired,
    envs: PropTypes.arrayOf(
      PropTypes.shape(
        EnvironmentSummaryModelValidationMap
      ) as PropTypes.Validator<EnvironmentSummaryModel>
    ).isRequired,
    subscribeApplication: PropTypes.func.isRequired,
    unsubscribeApplication: PropTypes.func.isRequired,
  };

  constructor(props: PageEnvironmentsProps) {
    super(props);
    props.subscribeApplication(props.appName);
  }

  override componentWillUnmount() {
    this.props.unsubscribeApplication(this.props.appName);
  }

  override componentDidUpdate(prevProps: Readonly<PageEnvironmentsProps>) {
    const { appName } = this.props;
    if (appName !== prevProps.appName) {
      this.props.unsubscribeApplication(prevProps.appName);
      this.props.subscribeApplication(appName);
    }
  }

  override render() {
    const { appName, envs } = this.props;
    return (
      <>
        <DocumentTitle title={`${appName} environments`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Environments' },
          ]}
        />
        <AsyncResource resource="APP" resourceParams={[appName]}>
          <EnvironmentsSummary appName={appName} envs={envs} />
        </AsyncResource>
      </>
    );
  }
}

function mapStateToProps(state: RootState): PageEnvironmentsState {
  return { envs: getEnvironmentSummaries(state) };
}

function mapDispatchToProps(dispatch: Dispatch): PageEnvironmentsDispatch {
  return {
    subscribeApplication: (appName) =>
      dispatch(actions.subscribeApplication(appName)),
    unsubscribeApplication: (appName) =>
      dispatch(actions.unsubscribeApplication(appName)),
  };
}

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(PageEnvironments)
);
