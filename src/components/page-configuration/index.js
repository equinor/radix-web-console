import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ChangeAdminForm from './change-admin-form';
import ChangeOwnerForm from './change-owner-form';
import ChangeRepositoryForm from './change-repository-form';
import ChangeMachineUserForm from './change-machine-user-form';
import ChangeWBSForm from './change-wbs-form';
import ChangeConfigBranchForm from './change-config-branch-form';
import DeleteApplicationForm from './delete-application-form';
import ImageHubsToggler from './image-hubs-toggler';
import BuildSecretsToggler from './build-secrets-toggler';
import MachineUserTokenForm from './machine-user-token-form';

import Alert from '../alert';
import AsyncResource from '../async-resource';
import ConfigureApplicationGithub from '../configure-application-github';
import DocumentTitle from '../document-title';

import { getApplication } from '../../state/application';
import { keys as configKeys } from '../../utils/config/keys';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import * as actions from '../../state/subscriptions/action-creators';
import configHandler from '../../utils/config';
import routes from '../../routes';

import './style.css';
import { Breadcrumbs, List, Accordion } from '@equinor/eds-core-react';

const renderAdGroups = (groups) =>
  groups.map((group) => (
    <List.Item>
      <a
        href={`https://portal.azure.com/#blade/Microsoft_AAD_IAM/GroupDetailsMenuBlade/Overview/groupId/${group}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {group}
      </a>
    </List.Item>
  ));

class PageConfiguration extends React.Component {
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
      <div className="o-layout-constrained">
        <DocumentTitle title={`${appName} Configuration`} />
        <Breadcrumbs>
          <Breadcrumbs.Breadcrumb
            href={routeWithParams(routes.app, { appName })}
          >
            {appName}
          </Breadcrumbs.Breadcrumb>
          <Breadcrumbs.Breadcrumb>Configuration</Breadcrumbs.Breadcrumb>
        </Breadcrumbs>
        <AsyncResource resource="APP" resourceParams={[appName]}>
          {application && (
            <main className="page-conf__overview">
              <section>
                <h4 className="o-heading-section">Overview</h4>
                <div className="overview_details">
                  <p className="body_short">
                    Application <strong>{application.name}</strong>
                  </p>
                  {application.registration.adGroups && (
                    <div className="overview_adgroups">
                      <p className="body_short">
                        Radix administrators (
                        <abbr title="Active Directory">AD</abbr> groups):
                      </p>
                      <List variant="bullet">
                        {renderAdGroups(application.registration.adGroups)}
                      </List>
                    </div>
                  )}
                  {!application.registration.adGroups && (
                    <Alert type="warning">
                      Can be administered by all Radix users
                    </Alert>
                  )}
                </div>
              </section>
              <section>
                <h4 className="o-heading-section">GitHub</h4>
                <p>
                  Cloned from{' '}
                  <a href={application.registration.repository}>
                    {application.registration.repository}
                  </a>
                </p>
                <ConfigureApplicationGithub
                  app={application.registration}
                  startCollapsed
                  deployKeyTitle="Deploy key"
                  webhookTitle="Webhook"
                  onDeployKeyChange={refreshApp}
                />
              </section>
              <Accordion
                className="accordion"
                chevronPosition="right"
                headerLevel="p"
              >
                <h4 className="o-heading-section">App secrets</h4>
                <ImageHubsToggler appName={appName} />
                <BuildSecretsToggler appName={appName} />
                {application.registration.machineUser && (
                  <MachineUserTokenForm appName={appName} />
                )}
              </Accordion>
              <Accordion
                className="accordion"
                chevronPosition="right"
                headerLevel="p"
              >
                <h4 className="o-heading-section">Danger zone</h4>
                {configHandler.getConfig(configKeys.FLAGS)
                  .enableChangeAdmin && (
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
              </Accordion>
            </main>
          )}
        </AsyncResource>
      </div>
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
  subscribe: (appName) => dispatch(actions.subscribeApplication(appName)),
  unsubscribe: (appName) => dispatch(actions.unsubscribeApplication(appName)),
  refreshApp: (appName) => dispatch(actions.refreshApp(appName)),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(PageConfiguration)
);
