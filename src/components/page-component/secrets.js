import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Alert from '../alert';
import Button from '../button';
import FormField from '../form-field';
import Spinner from '../spinner';

import { getEnvironment } from '../../state/environment';
import { getSaveState, getSaveError } from '../../state/secrets';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import requestStates from '../../state/state-utils/request-states';
import secretActions from '../../state/secrets/action-creators';

import EnvironmentModel from '../../models/environment/model';

export class Secrets extends Component {
  constructor(props) {
    super(props);
    this.state = { form: {} };

    this.props.component.secrets.forEach(
      secret => (this.state.form[secret] = '') // eslint-disable-line
    );

    this.getSaveHandler = this.getSaveHandler.bind(this);
    this.getHelpMessage = this.getHelpMessage.bind(this);
  }

  componentDidMount() {
    const { subscribeEnvironment, appName, envName } = this.props;
    subscribeEnvironment(appName, envName);
  }

  componentWillUnmount() {
    const { unsubscribeEnvironment, appName, envName } = this.props;
    unsubscribeEnvironment(appName, envName);
  }

  makeOnChangeHandler() {
    return ev =>
      this.setState({
        form: Object.assign({}, this.state.form, {
          [ev.target.name]: ev.target.value,
        }),
      });
  }

  getSaveHandler(secret) {
    return ev => {
      ev.preventDefault();
      this.props.saveSecret(secret, this.state.form[secret]);
    };
  }

  getHelpMessage(secret) {
    return (
      this.props.getSaveState(secret) === requestStates.FAILURE && (
        <Alert type="danger">
          Failed to save secret {this.props.getSaveError(secret)}
        </Alert>
      )
    );
  }

  render() {
    return (
      <React.Fragment>
        <ul>
          {this.props.component.secrets.map(secret => (
            <li key={secret}>
              <form onSubmit={this.getSaveHandler(secret)}>
                <fieldset
                  disabled={this.props.saveState === requestStates.IN_PROGRESS}
                >
                  <FormField label={secret} help={this.getHelpMessage(secret)}>
                    <input
                      name={secret}
                      type="text"
                      value={this.state.form[secret]}
                      onChange={this.makeOnChangeHandler()}
                    />
                    {
                      this.props.environment.secrets.find(
                        s => s.name === secret
                      ).status
                    }
                    <Button btnType="primary" type="submit">
                      Save
                    </Button>
                    {this.props.getSaveState(secret) ===
                      requestStates.IN_PROGRESS && <Spinner>Creating…</Spinner>}
                  </FormField>
                </fieldset>
              </form>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

Secrets.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
  environment: PropTypes.shape(EnvironmentModel),
  saveSecret: PropTypes.func.isRequired,
  getSaveState: PropTypes.func.isRequired,
  getSaveError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  environment: getEnvironment(state),
  getSaveState: secretName => getSaveState(state, secretName),
  getSaveError: secretName => getSaveError(state, secretName),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  subscribeEnvironment: (appName, envName) =>
    dispatch(subscriptionActions.subscribeEnvironment(appName, envName)),
  unsubscribeEnvironment: (appName, envName) =>
    dispatch(subscriptionActions.unsubscribeEnvironment(appName, envName)),
  saveSecret: (secretName, value) =>
    dispatch(
      secretActions.saveRequest(
        ownProps.appName,
        ownProps.envName,
        ownProps.component.name,
        secretName,
        value
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Secrets);
