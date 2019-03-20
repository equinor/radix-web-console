import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ApplicationDelete from '../application-delete';
import Breadcrumb from '../breadcrumb';
import ConfigureApplicationGithub from '../configure-application-github';
import DocumentTitle from '../document-title';
import ResourceLoading from '../resource-loading';

import { getApplication } from '../../state/application';

import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import * as subscriptionActions from '../../state/subscriptions/action-creators';

import './style.css';

const renderAdGroups = groups =>
  groups.map(group => <li key={group}>{group}</li>);

const PageConfiguration = ({ application, appName }) => {
  return (
    <div className="page-configuration">
      <DocumentTitle title={`${appName} Configuration`} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Configuration' },
        ]}
      />
      <main>
        <ResourceLoading resource="APP" resourceParams={[appName]}>
          {application && (
            <React.Fragment>
              <section>
                <h3 className="o-heading-section">Overview</h3>
                <p>
                  Application <strong>{application.name}</strong>
                </p>
                <p>AD Groups with Radix management rights</p>
                <ul className="o-indent-list">
                  {renderAdGroups(application.registration.adGroups)}
                </ul>
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
                <ApplicationDelete appName={appName} />
              </section>
            </React.Fragment>
          )}
        </ResourceLoading>
      </main>
    </div>
  );
};

PageConfiguration.propTypes = {
  appName: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  application: getApplication(state, ownProps.appName),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  subscribeApplication: () =>
    dispatch(subscriptionActions.subscribeApplication(appName)),
  unsubscribeApplication: () =>
    dispatch(subscriptionActions.unsubscribeApplication(appName)),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageConfiguration)
);
