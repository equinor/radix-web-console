import { List, Tooltip, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import BuildSecretsToggler from './build-secrets-toggler';
import ChangeAdminForm from './change-admin-form';
import ChangeConfigBranchForm from './change-config-branch-form';
import ChangeMachineUserForm from './change-machine-user-form';
import ChangeOwnerForm from './change-owner-form';
import ChangeRepositoryForm from './change-repository-form';
import ChangeWBSForm from './change-wbs-form';
import DeleteApplicationForm from './delete-application-form';
import ImageHubsToggler from './image-hubs-toggler';
import MachineUserTokenForm from './machine-user-token-form';

import Alert from '../alert';
import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import ConfigureApplicationGithub from '../configure-application-github';
import DocumentTitle from '../document-title';
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

const renderAdGroups = (groups) =>
  groups.map((group) => (
    <List.Item key={group}>
      <Typography
        link
        href={`https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupDetailsMenuBlade/Overview/groupId/${group}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {group}
      </Typography>
    </List.Item>
  ));

class PageConfiguration extends Component {
  componentDidMount() {
    this.props.subscribe(this.props.appName);
  }

  componentDidUpdate(prevProps) {
    const { appName } = this.props;
    if (appName !== prevProps.appName) {
      this.props.unsubscribe(prevProps.appName);
      this.props.subscribe(appName);
    }
  }

  componentWillUnmount() {
    this.props.unsubscribe(this.props.appName);
  }

  render() {
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
              <div className="grid grid--gap-medium">
                <Typography variant="h4">Overview</Typography>
                <section className="grid grid--gap-medium grid--overview-columns">
                  <div className="grid grid--gap-small">
                    <Typography>
                      Application <strong>{application.name}</strong>
                    </Typography>
                  </div>
                  <div className="grid grid--gap-small">
                    {!application.registration.adGroups?.length ? (
                      <Alert type="warning">
                        <Typography>
                          Can be administered by all Radix users
                        </Typography>
                      </Alert>
                    ) : (
                      <>
                        <Typography>
                          Radix administrators (
                          <Tooltip title="Active Directory" placement="top">
                            <span>AD</span>
                          </Tooltip>{' '}
                          groups):
                        </Typography>
                        <List className="grid grid--gap-small">
                          {renderAdGroups(application.registration.adGroups)}
                        </List>
                      </>
                    )}
                  </div>
                </section>
              </div>
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
                  startCollapsed
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

PageConfiguration.propTypes = {
  appName: PropTypes.string.isRequired,
  refreshApp: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  application: getApplication(state, ownProps.appName),
});

const mapDispatchToProps = (dispatch) => ({
  subscribe: (appName) => dispatch(subscribeApplication(appName)),
  unsubscribe: (appName) => dispatch(unsubscribeApplication(appName)),
  refreshApp: (appName) => dispatch(refreshApp(appName)),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(PageConfiguration)
);
