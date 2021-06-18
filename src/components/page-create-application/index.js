import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Alert from '../alert';
import ConfigureApplicationGithub from '../configure-application-github';
import CreateApplicationForm from '../create-application-form';
import Panel from '../panel';

import {
  getCreationResult,
  getCreationState,
} from '../../state/application-creation';
import appsActions from '../../state/application-creation/action-creators';
import requestStates from '../../state/state-utils/request-states';

import { routeWithParams } from '../../utils/string';
import externalUrls from '../../externalUrls';
import routes from '../../routes';

import './style.css';

export class PageCreateApplication extends Component {
  componentWillUnmount() {
    this.props.resetCreate();
  }

  render() {
    return (
      <div>
        {this.props.creationState !== requestStates.SUCCESS && (
          <CreateApplicationForm />
        )}
        {this.props.creationState === requestStates.SUCCESS && (
          <div>
            <p>
              The application "{this.props.creationResult.name}" has been set up
            </p>
            <ConfigureApplicationGithub
              app={this.props.creationResult}
              startVisible
              useOtherCiToolOptionVisible
            />
            <p>
              You can now go to{' '}
              <Link
                to={routeWithParams(routes.app, {
                  appName: this.props.creationResult.name,
                })}
              >
                your application's page
              </Link>
            </p>
          </div>
        )}
      </div>
    );
  }
}

PageCreateApplication.propTypes = {
  creationState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
  resetCreate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  creationState: getCreationState(state),
  creationResult: getCreationResult(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestCreate: (app) => dispatch(appsActions.addAppRequest(app)),
  resetCreate: () => dispatch(appsActions.addAppReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCreateApplication);
