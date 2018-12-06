import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../button';
import FormField from '../form-field';
import Spinner from '../spinner';
import Alert from '../alert';

import secretActions from '../../state/secrets/action-creators';
import { getSaveState, getSaveError } from '../../state/secrets';
import requestStates from '../../state/state-utils/request-states';

export class Secrets extends Component {
  constructor(props) {
    super(props);
    this.state = { form: {} };

    this.props.component.secrets.forEach(
      secret => (this.state.form[secret] = '') // eslint-disable-line
    );

    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.saveSecrets(this.state.form);
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <fieldset
            disabled={this.props.saveState === requestStates.IN_PROGRESS}
          >
            <ul>
              {this.props.component.secrets.map(secret => (
                <li key={secret}>
                  <FormField label={secret}>
                    <input
                      name={secret}
                      type="text"
                      value={this.state.form[secret]}
                      onChange={this.makeOnChangeHandler()}
                    />
                  </FormField>
                </li>
              ))}
            </ul>
            {this.props.saveState === requestStates.FAILURE && (
              <Alert type="danger">
                Failed to save secrets. {this.props.saveError}
              </Alert>
            )}
            <div className="o-action-bar">
              <Button btnType="primary" type="submit">
                Save
              </Button>
              {this.props.saveState === requestStates.IN_PROGRESS && (
                <Spinner>Creating…</Spinner>
              )}
            </div>
          </fieldset>
        </form>
      </React.Fragment>
    );
  }
}

Secrets.propTypes = {
  namespace: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
  saveSecrets: PropTypes.func.isRequired,
  getSaveState: PropTypes.func.isRequired,
  getSaveError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  getSaveState: secretName => getSaveState(state, secretName),
  getSaveError: secretName => getSaveError(state, secretName),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveSecrets: secrets => {
    // TODO review this
    secrets.forEach(secret =>
      dispatch(
        secretActions.saveRequest(
          ownProps.component.name,
          ownProps.namespace,
          secret
        )
      )
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Secrets);
