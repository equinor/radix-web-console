import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { BuildSecretsToggler } from './build-secrets-toggler';
import ChangeAdminForm from './change-admin-form';
import { ChangeConfigBranchForm } from './change-config-branch-form';
import { ChangeMachineUserForm } from './change-machine-user-form';
import { ChangeOwnerForm } from './change-owner-form';
import { ChangeRepositoryForm } from './change-repository-form';
import { ChangeWBSForm } from './change-wbs-form';
import DeleteApplicationForm from './delete-application-form';
import { ImageHubsToggler } from './image-hubs-toggler';
import { MachineUserTokenForm } from './machine-user-token-form';
import { Overview } from './overview';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import { ConfigureApplicationGithub } from '../configure-application-github';
import { DocumentTitle } from '../document-title';
import { RootState } from '../../init/store';
import {
  ApplicationModel,
  ApplicationModelValidationMap,
} from '../../models/application';
import { routes } from '../../routes';
import { getApplication } from '../../state/application';
import {
  refreshApp,
  subscribeApplication,
  unsubscribeApplication,
} from '../../state/subscriptions/action-creators';
import { configVariables } from '../../utils/config';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

import './style.css';
import { ChangeConfigurationItemForm } from './change-ci-form';

interface PageConfigurationDispatch {
  subscribe: (appName: string) => void;
  unsubscribe: (appName: string) => void;
  refreshApp: (appName: string) => void;
}

interface PageConfigurationState {
  application?: ApplicationModel;
}

export interface PageConfigurationProps
  extends PageConfigurationDispatch,
    PageConfigurationState {
  appName: string;
}

export class PageConfiguration extends Component<PageConfigurationProps> {
  static readonly propTypes: PropTypes.ValidationMap<PageConfigurationProps> = {
    appName: PropTypes.string.isRequired,
    application: PropTypes.shape(
      ApplicationModelValidationMap
    ) as PropTypes.Validator<ApplicationModel>,
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
    refreshApp: PropTypes.func.isRequired,
  };

  override componentDidMount() {
    this.props.subscribe(this.props.appName);
  }

  override componentDidUpdate(prevProps: Readonly<PageConfigurationProps>) {
    const { appName, subscribe, unsubscribe } = this.props;
    if (appName !== prevProps.appName) {
      unsubscribe(prevProps.appName);
      subscribe(appName);
    }
  }

  override componentWillUnmount() {
    this.props.unsubscribe(this.props.appName);
  }

  override render() {
    const { application, appName, refreshApp } = this.props;
    return (
      <>
        <DocumentTitle title={`${appName} Configuration`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Configuration' },
          ]}
        />
        <AsyncResource resource="APP" resourceParams={[appName]}>
          {application && (
            <>
              <Overview
                adGroups={application.registration.adGroups}
                appName={appName}
              />
              <section className="grid grid--gap-medium">
                <Typography variant="h4">GitHub</Typography>
                <Typography>
                  Cloned from{' '}
                  <Typography link href={application.registration.repository}>
                    {application.registration.repository}
                  </Typography>
                </Typography>
                <ConfigureApplicationGithub
                  app={application.registration}
                  deployKeyTitle="Deploy key"
                  webhookTitle="Webhook"
                  onDeployKeyChange={refreshApp}
                />
              </section>
              <section className="grid grid--gap-small">
                <Typography variant="h4">App secrets</Typography>
                <ImageHubsToggler appName={appName} />
                <BuildSecretsToggler appName={appName} />
                {application.registration.machineUser && (
                  <MachineUserTokenForm appName={appName} />
                )}
              </section>
              <section className="grid grid--gap-small">
                <Typography variant="h4">Danger zone</Typography>
                {configVariables.FLAGS.enableChangeAdmin && (
                  <ChangeAdminForm
                    adGroups={application.registration.adGroups}
                    appName={appName}
                  />
                )}
                <ChangeRepositoryForm
                  app={application.registration}
                  appName={appName}
                  repository={application.registration.repository}
                />
                <ChangeConfigBranchForm
                  appName={appName}
                  configBranch={application.registration.configBranch}
                />
                <ChangeOwnerForm
                  appName={appName}
                  owner={application.registration.owner}
                />
                <ChangeWBSForm
                  appName={appName}
                  wbs={application.registration.wbs}
                />
                <ChangeConfigurationItemForm
                  appName={appName}
                  configurationItem={application.registration.configurationItem}
                />
                <ChangeMachineUserForm
                  appName={appName}
                  machineUser={application.registration.machineUser}
                  onMachineUserChange={refreshApp}
                />
                <DeleteApplicationForm appName={appName} />
              </section>
            </>
          )}
        </AsyncResource>
      </>
    );
  }
}

function mapStateToProps(state: RootState): PageConfigurationState {
  return {
    application: getApplication(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): PageConfigurationDispatch {
  return {
    subscribe: (appName) => dispatch(subscribeApplication(appName)),
    unsubscribe: (appName) => dispatch(unsubscribeApplication(appName)),
    refreshApp: (appName) => dispatch(refreshApp(appName)),
  };
}

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(PageConfiguration)
);
