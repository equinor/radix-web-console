import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Breadcrumb from '../breadcrumb';
import DocumentTitle from '../document-title';
import ConfigureApplicationGithub from '../configure-application-github';

import { getApplication } from '../../state/application';

import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import * as subscriptionActions from '../../state/subscriptions/action-creators';

import './style.css';

const renderAdGroups = groups =>
  groups.map(group => <li key={group}>{group}</li>);

const PageConfiguration = ({ application, appName }) => {
  if (!application) {
    return 'Loading...';
  }

  const { registration } = application;

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
        <section>
          <h3 className="o-heading-section">Overview</h3>
          <p>
            Application <strong>{application.name}</strong>
          </p>
          <p>
            Link to repository{' '}
            <a href={registration.repository}>{registration.repository}</a>
          </p>
          <p>AD Groups with Radix management rights:</p>
          <ul className="o-indent-list">
            {renderAdGroups(registration.adGroups)}
          </ul>
        </section>
        <section>
          <h3 className="o-heading-section">GitHub</h3>
          <ConfigureApplicationGithub
            app={registration}
            startCollapsed
            deployKeyTitle="Deploy key"
            webhookTitle="Webhook"
          />
        </section>
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
