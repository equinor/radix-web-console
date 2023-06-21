import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { BuildSecretsToggler } from './build-secrets-toggler';
import ChangeAdminForm from './change-admin-form';
import { ChangeConfigurationItemForm } from './change-ci-form';
import { ChangeConfigBranchForm } from './change-config-branch-form';
import { ChangeConfigFileForm } from './change-config-file-form';
import { ChangeMachineUserForm } from './change-machine-user-form';
import { ChangeRepositoryForm } from './change-repository-form';
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
} from '../../models/radix-api/applications/application';
import { ApplicationRegistrationModel } from '../../models/radix-api/applications/application-registration';
import { routes } from '../../routes';
import { getMemoizedApplication } from '../../state/application';
import {
  refreshApp,
  subscribeApplication,
  unsubscribeApplication,
} from '../../state/subscriptions/action-creators';
import { configVariables } from '../../utils/config';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

import './style.css';

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

function getConfigBranch(configBranch: string): string {
  return configBranch || 'master';
}

function getRadixConfigFullName(radixConfigFullName: string): string {
  return radixConfigFullName || 'radixconfig.yaml';
}

function getConfigBranchUrl({
  configBranch,
  repository,
}: ApplicationRegistrationModel): string {
  return `${repository}/tree/${getConfigBranch(configBranch)}`;
}

function getConfigFileUrl({
  configBranch,
  radixConfigFullName,
  repository,
}: ApplicationRegistrationModel): string {
  return `${repository}/blob/${configBranch}/${getRadixConfigFullName(
    radixConfigFullName
  )}`;
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
    const {
      application: { registration },
      appName,
      refreshApp,
    } = this.props;

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
          {registration?.name && (
            <>
              <Overview adGroups={registration.adGroups} appName={appName} />
              <section className="grid grid--gap-medium">
                <Typography variant="h4">GitHub</Typography>
                <Typography>
                  Cloned from{' '}
                  <Typography link href={registration.repository}>
                    {registration.repository}
                  </Typography>
                </Typography>
                <Typography>
                  Config branch{' '}
                  <Typography link href={getConfigBranchUrl(registration)}>
                    {getConfigBranch(registration.configBranch)}
                  </Typography>
                </Typography>
                <Typography>
                  Config file{' '}
                  <Typography link href={getConfigFileUrl(registration)}>
                    {getRadixConfigFullName(registration.radixConfigFullName)}
                  </Typography>
                </Typography>
                <ConfigureApplicationGithub
                  app={registration}
                  deployKeyTitle="Deploy key"
                  webhookTitle="Webhook"
                  onDeployKeyChange={refreshApp}
                  initialSecretPollInterval={5000}
                />
              </section>
              <section className="grid grid--gap-small">
                <Typography variant="h4">App Secrets</Typography>
                <ImageHubsToggler appName={appName} />
                <BuildSecretsToggler appName={appName} />
                {registration.machineUser && (
                  <MachineUserTokenForm appName={appName} />
                )}
              </section>
              <section className="grid grid--gap-small">
                <Typography variant="h4">Danger Zone</Typography>
                {configVariables.FLAGS.enableChangeAdmin && (
                  <ChangeAdminForm
                    appName={appName}
                    adGroups={registration.adGroups}
                  />
                )}
                <ChangeRepositoryForm
                  appName={appName}
                  repository={registration.repository}
                  app={registration}
                />
                <ChangeConfigBranchForm
                  appName={appName}
                  configBranch={registration.configBranch}
                />
                <ChangeConfigFileForm
                  appName={appName}
                  radixConfigFullName={registration.radixConfigFullName}
                />
                <ChangeConfigurationItemForm
                  appName={appName}
                  configurationItem={registration.configurationItem}
                />
                <ChangeMachineUserForm
                  appName={appName}
                  machineUser={registration.machineUser}
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
  return { application: { ...getMemoizedApplication(state) } };
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
