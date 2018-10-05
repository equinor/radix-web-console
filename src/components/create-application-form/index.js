import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCreationState, getCreationError } from '../../state/applications';
import appsActions from '../../state/applications/action-creators';
import requestStates from '../../state/state-utils/request-states';
import routes from '../../routes';

import Alert from '../alert';
import Button from '../button';
import FormField from '../form-field';
import Spinner from '../spinner';
import './style.css';

export class CreateApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        adGroups: '',
        repository: '',
        sharedSecret: '',
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.resetCreate();
  }

  makeOnChangeHandler() {
    return ev =>
      this.setState({
        form: Object.assign({}, this.state.form, {
          [ev.target.name]: ev.target.value,
        }),
      });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.requestCreate(this.state.form);
  }

  render() {
    if (this.props.creationState === requestStates.SUCCESS) {
      return (
        <Alert>
          Success. <Link to={routes.apps}>See all applications</Link>
        </Alert>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset
          disabled={this.props.creationState === requestStates.IN_PROGRESS}
        >
          <FormField label="GitHub repository">
            <input
              name="repository"
              type="text"
              value={this.state.form.repository}
              onChange={this.makeOnChangeHandler()}
            />
          </FormField>
          <FormField label="Shared secret">
            <input
              name="sharedSecret"
              type="text"
              value={this.state.form.sharedSecret}
              onChange={this.makeOnChangeHandler()}
            />
          </FormField>
          <FormField label="AD Groups (comma-separated)">
            <input
              name="adGroups"
              type="text"
              value={this.state.form.adGroups}
              onChange={this.makeOnChangeHandler()}
            />
          </FormField>
          {this.props.creationState === requestStates.FAILURE && (
            <Alert type="danger">
              Failed to create application. {this.props.creationError}
            </Alert>
          )}
          <div className="o-layout-toolbar">
            <Button btnType="primary" type="submit">
              Create
            </Button>
            {this.props.creationState === requestStates.IN_PROGRESS && (
              <Spinner>Creating…</Spinner>
            )}
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
  resetCreate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  creationState: getCreationState(state),
  creationError: getCreationError(state),
});

const mapDispatchToProps = dispatch => ({
  requestCreate: app => dispatch(appsActions.addAppRequest(app)),
  resetCreate: () => dispatch(appsActions.addAppReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateApplicationForm);
