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
  ApplicationModel,
  ApplicationModelValidationMap,
} from '../../models/radix-api/applications/application';
import { routes } from '../../routes';
import { getMemoizedApplication } from '../../state/application';
import {
  subscribeApplication,
  unsubscribeApplication,
} from '../../state/subscriptions/action-creators';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

interface PageEnvironmentsState {
  application: ApplicationModel;
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
    application: PropTypes.shape(ApplicationModelValidationMap)
      .isRequired as PropTypes.Validator<ApplicationModel>,
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
    const {
      application: { environments, registration },
      appName,
    } = this.props;
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
          <EnvironmentsSummary
            appName={appName}
            envs={environments}
            repository={registration.repository}
          />
        </AsyncResource>
      </>
    );
  }
}

function mapStateToProps(state: RootState): PageEnvironmentsState {
  return { application: { ...getMemoizedApplication(state) } };
}

function mapDispatchToProps(dispatch: Dispatch): PageEnvironmentsDispatch {
  return {
    subscribeApplication: (appName) => dispatch(subscribeApplication(appName)),
    unsubscribeApplication: (appName) =>
      dispatch(unsubscribeApplication(appName)),
  };
}

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(PageEnvironments)
);
