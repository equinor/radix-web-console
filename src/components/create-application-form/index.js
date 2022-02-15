import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getCreationState,
  getCreationError,
} from '../../state/application-creation';
import appsActions from '../../state/application-creation/action-creators';
import requestStates from '../../state/state-utils/request-states';
import externalUrls from '../../externalUrls';

import Alert from '../alert';
import AppConfigAdGroups from '../app-config-ad-groups';
import {
  Icon,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';

export class CreateApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        adModeAuto: false,
        adGroups: '',
        name: '',
        repository: '',
        owner: '',
        wbs: '',
        configBranch: '',
      },
    };

    this.handleAdModeChange = this.handleAdModeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  makeOnChangeHandler() {
    return (ev) => {
      this.setState({
        form: Object.assign({}, this.state.form, {
          [ev.target.name]: ev.target.value,
        }),
      });
    };
  }

  handleAdModeChange(ev) {
    this.setState({
      form: Object.assign({}, this.state.form, {
        adModeAuto: ev.target.value === 'true',
      }),
    });
  }

  // Force name to lowercase, no spaces
  // TODO: This behaviour is nasty; un-nastify it
  handleNameChange(ev) {
    this.setState({
      form: Object.assign({}, this.state.form, {
        name: ev.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      }),
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.requestCreate(this.state.form);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="grid grid--gap-medium">
        <Alert className="icon">
          <Icon data={info_circle} color="primary" />
          <div>
            <Typography>
              Your application needs a GitHub repository with a radixconfig.yaml
              file and a Dockerfile.
            </Typography>
            <Typography>
              You can read about{' '}
              <Typography
                link
                href={externalUrls.referenceRadixConfig}
                rel="noopener noreferrer"
                target="_blank"
              >
                radixconfig.yaml
              </Typography>{' '}
              and{' '}
              <Typography
                link
                href={externalUrls.guideDockerfileComponent}
                rel="noopener noreferrer"
                target="_blank"
              >
                Dockerfile best practices
              </Typography>
              .
            </Typography>
            <Typography>
              Need help? Get in touch on our{' '}
              <Typography
                link
                href={externalUrls.slackRadixSupport}
                rel="noopener noreferrer"
                target="_blank"
              >
                Slack support channel
              </Typography>
            </Typography>
          </div>
        </Alert>
        <fieldset
          disabled={this.props.creationState === requestStates.IN_PROGRESS}
          className="grid grid--gap-medium"
        >
          <TextField
            label="Name"
            helperText="Lower case; no spaces or special characters"
            name="name"
            value={this.state.form.name}
            onChange={this.handleNameChange}
          />
          <TextField
            label="GitHub repository"
            helperText="Full URL, e.g. 'https://github.com/equinor/my-app'"
            name="repository"
            value={this.state.form.repository}
            onChange={this.makeOnChangeHandler()}
          />
          <TextField
            label="Config Branch"
            helperText="The name of the branch where Radix will read the radixconfig.yaml from, e.g. 'main' or 'master'"
            name="configBranch"
            value={this.state.form.configBranch}
            onChange={this.makeOnChangeHandler()}
          />
          <TextField
            label="Owner"
            type="email"
            helperText="Owner of the application (email). Can be a single person or shared group email"
            name="owner"
            value={this.state.form.owner}
            onChange={this.makeOnChangeHandler()}
          />
          <AppConfigAdGroups
            adGroups={this.state.form.adGroups}
            adModeAuto={this.state.form.adModeAuto}
            handleAdGroupsChange={this.makeOnChangeHandler()}
            handleAdModeChange={this.handleAdModeChange}
          />
          <TextField
            label="WBS"
            helperText="WBS of the application for cost allocation"
            name="wbs"
            value={this.state.form.wbs}
            onChange={this.makeOnChangeHandler()}
          />
          {this.props.creationState === requestStates.FAILURE && (
            <Alert type="danger">
              Failed to create application. {this.props.creationError}
            </Alert>
          )}
          <div className="o-action-bar grid grid--gap-medium">
            {this.props.creationState === requestStates.IN_PROGRESS && (
              <Typography>
                <CircularProgress size={24} /> Creating…
              </Typography>
            )}
            <div>
              <Button btnType="primary" type="submit">
                Create new app
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }
}

CreateApplicationForm.propTypes = {
  creationState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
  creationError: PropTypes.string,
  requestCreate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  creationState: getCreationState(state),
  creationError: getCreationError(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestCreate: (app) => dispatch(appsActions.addAppRequest(app)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateApplicationForm);
