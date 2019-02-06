import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Breadcrumb from '../breadcrumb';
import Code from '../code';
import DocumentTitle from '../document-title';
import Toggler from '../toggler';
import ConfigureApplicationGithub from '../configure-application-github';

import { getApplication } from '../../state/application';

import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import * as subscriptionActions from '../../state/subscriptions/action-creators';

class PageConfiguration extends React.Component {
  render() {
    const { application, appName } = this.props;

    if (!application) {
      return 'Loading...';
    }

    const { registration } = application;

    return (
      <React.Fragment>
        <DocumentTitle title={`${this.props.appName} Configuration`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Configuration' },
          ]}
        />
        <main style={{ maxWidth: 'calc(var(--layout-max-width)/2)' }}>
          <section>
            <h3 className="o-heading-section">Overview</h3>
            <p>
              Name: <strong>{application.name}</strong>
            </p>
            <p>
              Repository:{' '}
              <a href={registration.repository}>{registration.repository}</a>
            </p>
            <p>AD Groups with Radix management rights:</p>
            <code>{registration.adGroups.join('\n')}</code>
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
      </React.Fragment>
    );
  }
}

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
