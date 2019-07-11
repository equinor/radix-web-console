import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ChangeAdminForm from './change-admin-form';
import DeleteApplicationForm from './delete-application-form';

import Alert from '../alert';
import AsyncResource from '../async-resource';
import Breadcrumb from '../breadcrumb';
import ConfigureApplicationGithub from '../configure-application-github';
import DocumentTitle from '../document-title';

import { getApplication } from '../../state/application';
import { keys as configKeys } from '../../utils/config/keys';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import * as actions from '../../state/subscriptions/action-creators';
import configHandler from '../../utils/config';
import routes from '../../routes';

const renderAdGroups = groups =>
  groups.map(group => <li key={group}>{group}</li>);

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
    const { application, appName } = this.props;
    return (
      <div className="o-layout-constrained">
        <DocumentTitle title={`${appName} Configuration`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Configuration' },
          ]}
        />
        <AsyncResource resource="APP" resourceParams={[appName]}>
          {application && (
            <main>
              <section>
                <h3 className="o-heading-section">Overview</h3>
                <p>
                  Application <strong>{application.name}</strong>
                </p>
                {application.registration.adGroups && (
                  <React.Fragment>
                    <p>
                      Radix administrators (
                      <abbr title="Active Directory">AD</abbr> groups):
                    </p>
                    <ul className="o-indent-list">
                      {renderAdGroups(application.registration.adGroups)}
                    </ul>
                  </React.Fragment>
                )}
                {!application.registration.adGroups && (
                  <Alert type="warning">
                    Can be administered by all Radix users
                  </Alert>
                )}
              </section>
              <section>
                <h3 className="o-heading-section">GitHub</h3>
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
                />
              </section>
              <section>
                <h3 className="o-heading-section">Danger zone</h3>
                {configHandler.getConfig(configKeys.FLAGS)
                  .enableChangeAdmin && (
                  <ChangeAdminForm
                    adGroups={application.registration.adGroups}
                    appName={appName}
                  />
                )}
                <DeleteApplicationForm appName={appName} />
              </section>
            </main>
          )}
        </AsyncResource>
      </div>
    );
  }
}

PageConfiguration.propTypes = {
  appName: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  application: getApplication(state, ownProps.appName),
});

const mapDispatchToProps = dispatch => ({
  subscribe: appName => dispatch(actions.subscribeApplication(appName)),
  unsubscribe: appName => dispatch(actions.unsubscribeApplication(appName)),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageConfiguration)
);
