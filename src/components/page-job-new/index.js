import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Alert from '../alert';
import Breadcrumb from '../breadcrumb';
import CreateJobForm from '../create-job-form';
import DocumentTitle from '../document-title';
import Panel from '../panel';

import { routeWithParams } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import requestStates from '../../state/state-utils/request-states';
import routes from '../../routes';

class PageJobNew extends React.Component {
  componentWillUnmount() {
    this.props.resetCreate();
  }

  render() {
    const { appName } = this.props;
    return (
      <React.Fragment>
        <DocumentTitle title={`${appName} jobs`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Jobs', to: routeWithParams(routes.appJobs, { appName }) },
            { label: 'New' },
          ]}
        />
        <main>
          <Panel>
            {this.props.creationState !== requestStates.SUCCESS && (
              <CreateJobForm />
            )}
            {this.props.creationState === requestStates.SUCCESS && (
              <div>
                <Alert>
                  The job "{this.props.creationResult.name}" has been created
                </Alert>
                <p>
                  View
                  <Link
                    to={routeWithParams(routes.appJob, {
                      appName: this.props.appName,
                      jobName: this.props.creationResult.name,
                    })}
                  >
                    job
                  </Link>
                  or all
                  <Link
                    to={routeWithParams(routes.appJobs, {
                      appName: this.props.appName,
                      jobName: this.props.creationResult.name,
                    })}
                  >
                    job
                  </Link>
                </p>
              </div>
            )}
          </Panel>
        </main>
      </React.Fragment>
    );
  }
}

PageJobNew.propTypes = {
  appName: PropTypes.string.isRequired,
  creationState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
  resetCreate: PropTypes.func.isRequired,
};

const getCreationState = state => {};
const getCreationResult = state => {};

const appsActions = {
  addAppRequest: app => {},
  addAppReset: () => {},
};

const mapStateToProps = state => ({
  creationState: getCreationState(state),
  creationResult: getCreationResult(state),
});

const mapDispatchToProps = dispatch => ({
  requestCreate: app => dispatch(appsActions.addAppRequest(app)),
  resetCreate: () => dispatch(appsActions.addAppReset()),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageJobNew)
);
