import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getCreationState,
  getCreationError,
} from '../../state/application-creation';
import appsActions from '../../state/application-creation/action-creators';
import requestStates from '../../state/state-utils/request-states';

import Alert from '../alert';
import AppConfigAdGroups from '../app-config-ad-groups';
import Button from '../button';
import FormField from '../form-field';
import Spinner from '../spinner';

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
      },
    };

    this.handleAdModeChange = this.handleAdModeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChanged() {
    // if there is an creation error then we will send a reset create to clear
    // the error
    if (this.props.creationError) {
      this.props.resetCreate();
    }
  }

  makeOnChangeHandler() {
    return (ev) => {
      this.handleFormChanged();
      this.setState({
        form: Object.assign({}, this.state.form, {
          [ev.target.name]: ev.target.value,
        }),
      });
    };
  }

  handleAdModeChange(ev) {
    this.handleFormChanged();
    this.setState({
      form: Object.assign({}, this.state.form, {
        adModeAuto: ev.target.value === 'true',
      }),
    });
  }

  // Force name to lowercase, no spaces
  // TODO: This behaviour is nasty; un-nastify it
  handleNameChange(ev) {
    this.handleFormChanged();
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
      <form onSubmit={this.handleSubmit}>
        <fieldset
          disabled={this.props.creationState === requestStates.IN_PROGRESS}
        >
          <FormField
            label="Name"
            help="Lower case; no spaces or special characters"
          >
            <input
              name="name"
              type="text"
              value={this.state.form.name}
              onChange={this.handleNameChange}
            />
          </FormField>
          <FormField
            label="GitHub repository"
            help="Full URL, e.g. 'https://github.com/equinor/my-app'"
          >
            <input
              name="repository"
              type="text"
              value={this.state.form.repository}
              onChange={this.makeOnChangeHandler()}
            />
          </FormField>
          <FormField
            label="Owner"
            help="Owner of the application (email). Can be a single person or shared group email"
          >
            <input
              name="owner"
              type="email"
              value={this.state.form.owner}
              onChange={this.makeOnChangeHandler()}
            />
          </FormField>
          <AppConfigAdGroups
            adGroups={this.state.form.adGroups}
            adModeAuto={this.state.form.adModeAuto}
            handleAdGroupsChange={this.makeOnChangeHandler()}
            handleAdModeChange={this.handleAdModeChange}
          />
          {this.props.creationState === requestStates.FAILURE && (
            <Alert type="danger">
              Failed to create application. {this.props.creationError}
            </Alert>
          )}
          <div className="o-action-bar">
            {this.props.creationState === requestStates.IN_PROGRESS && (
              <Spinner>Creating…</Spinner>
            )}
            <Button btnType="primary" type="submit">
              Create
            </Button>
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
  resetCreate: () => dispatch(appsActions.addAppReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateApplicationForm);
