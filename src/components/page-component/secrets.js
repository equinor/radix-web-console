import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Alert from '../alert';
import Button from '../button';
import Chip from '../chip';
import FormField from '../form-field';
import Spinner from '../spinner';

import { getEnvironment } from '../../state/environment';
import { getSaveState, getSaveError } from '../../state/secrets';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import requestStates from '../../state/state-utils/request-states';
import secretActions from '../../state/secrets/action-creators';

import { Environment } from 'radix-web-console-models';

export class Secrets extends Component {
  constructor(props) {
    super(props);
    this.state = { form: {} };

    this.props.component.secrets.forEach(
      secret => (this.state.form[secret] = '') // eslint-disable-line
    );

    this.getSaveHandler = this.getSaveHandler.bind(this);
    this.getHelpMessage = this.getHelpMessage.bind(this);
    this.getLabel = this.getLabel.bind(this);
  }

  componentDidMount() {
    const { subscribeEnvironment, appName, envName } = this.props;
    subscribeEnvironment(appName, envName);
  }

  componentWillUnmount() {
    const {
      appName,
      envName,
      resetSaveStates,
      unsubscribeEnvironment,
    } = this.props;
    unsubscribeEnvironment(appName, envName);
    resetSaveStates(this.props.environment.secrets);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.environment.secrets !== this.props.environment.secrets) {
      this.props.resetSaveStates(this.props.environment.secrets);
    }
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
          Failed to save secret. {this.props.getSaveError(secret)}
        </Alert>
      )
    );
  }

  getLabel(secret) {
    const envSecrets = this.props.environment.secrets;
    const status = envSecrets.find(s => s.name === secret).status;
    const chipType = status === 'Pending' ? 'danger' : null;
    return (
      <React.Fragment>
        {secret}{' '}
        <Chip type={chipType}>{status === 'Pending' ? 'Missing' : status}</Chip>
      </React.Fragment>
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
                  disabled={
                    this.props.getSaveState(secret) ===
                    requestStates.IN_PROGRESS
                  }
                >
                  <FormField
                    label={this.getLabel(secret)}
                    help={this.getHelpMessage(secret)}
                  >
                    <input
                      name={secret}
                      type="text"
                      value={this.state.form[secret]}
                      onChange={this.makeOnChangeHandler()}
                    />
                    <Button type="submit">Save</Button>
                    {this.props.getSaveState(secret) ===
                      requestStates.IN_PROGRESS && <Spinner />}
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
  component: PropTypes.object.isRequired,
  environment: PropTypes.shape(Environment),
  envName: PropTypes.string.isRequired,
  getSaveError: PropTypes.func.isRequired,
  getSaveState: PropTypes.func.isRequired,
  resetSaveStates: PropTypes.func.isRequired,
  saveSecret: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  environment: getEnvironment(state),
  getSaveState: secretName => getSaveState(state, secretName),
  getSaveError: secretName => getSaveError(state, secretName),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetSaveStates: secrets =>
    secrets.map(secret => dispatch(secretActions.saveReset(secret))),
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
  subscribeEnvironment: (appName, envName) =>
    dispatch(subscriptionActions.subscribeEnvironment(appName, envName)),
  unsubscribeEnvironment: (appName, envName) =>
    dispatch(subscriptionActions.unsubscribeEnvironment(appName, envName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Secrets);
