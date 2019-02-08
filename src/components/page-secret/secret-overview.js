import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Alert from '../alert';
import Breadcrumb from '../breadcrumb';
import Button from '../button';
import EnvironmentBadge from '../environment-badge';
import FormField from '../form-field';
import Panel from '../panel';
import SecretStatus from '../secret-status';
import Spinner from '../spinner';

import { getSaveState, getSaveError } from '../../state/secrets';
import { getSecret } from '../../state/environment';
import { routeWithParams } from '../../utils/string';
import * as actionCreators from '../../state/subscriptions/action-creators';
import requestStates from '../../state/state-utils/request-states';
import routes from '../../routes';
import secretActions from '../../state/secrets/action-creators';

const shouldFormBeDisabled = saveStatus =>
  [requestStates.IN_PROGRESS, requestStates.SUCCESS].includes(saveStatus);

export class SecretOverview extends React.Component {
  constructor() {
    super();
    this.state = { value: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.subscribe();
  }

  componentDidUpdate(prevProps) {
    const {
      appName,
      envName,
      resetSaveStates,
      subscribe,
      unsubscribe,
    } = this.props;

    if (appName !== prevProps.appName || envName !== prevProps.envName) {
      unsubscribe(prevProps.appName, prevProps.envName);
      resetSaveStates();
      subscribe();
    }
  }

  componentWillUnmount() {
    const { unsubscribe, resetSaveStates } = this.props;

    unsubscribe();
    resetSaveStates();
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.saveSecret(this.state.value);
  }

  render() {
    const {
      appName,
      envName,
      componentName,
      secretName,
      saveError,
      saveState,
      secret,
    } = this.props;

    return (
      <React.Fragment>
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            {
              label: (
                <React.Fragment>
                  <EnvironmentBadge envName={envName} /> environment
                </React.Fragment>
              ),
              to: routeWithParams(routes.appEnvironment, {
                appName,
                envName,
              }),
            },
            {
              to: routeWithParams(routes.appActiveComponent, {
                appName,
                envName,
                componentName,
              }),
              label: componentName,
            },
            { label: `secret "${secretName}"` },
          ]}
        />
        <main>
          {!secret && 'No secret…'}
          {secret && (
            <React.Fragment>
              <h2 className="o-heading-section">Overview</h2>
              <p>
                Secret <strong>{secretName}</strong>
              </p>
              <p>
                Status <SecretStatus secret={secret} />
              </p>
              <div className="secret-overview-form">
                <Panel>
                  <form onSubmit={this.handleSubmit}>
                    <fieldset disabled={shouldFormBeDisabled(saveState)}>
                      <FormField
                        label="Secret value"
                        help="Existing value will be overwritten"
                      >
                        <textarea
                          onChange={ev =>
                            this.setState({ value: ev.target.value })
                          }
                          value={this.state.value}
                        />
                      </FormField>
                      {saveState === requestStates.FAILURE && (
                        <Alert type="danger">
                          Error while saving. {saveError}
                        </Alert>
                      )}
                      {saveState === requestStates.SUCCESS && (
                        <Alert type="info">Saved</Alert>
                      )}
                      <div className="o-action-bar">
                        {saveState === requestStates.IN_PROGRESS && (
                          <Spinner>Saving…</Spinner>
                        )}
                        <Button btnType="primary" type="submit">
                          Save
                        </Button>
                      </div>
                    </fieldset>
                  </form>
                </Panel>
              </div>
            </React.Fragment>
          )}
        </main>
      </React.Fragment>
    );
  }
}

SecretOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  resetSaveStates: PropTypes.func.isRequired,
  saveError: PropTypes.string,
  saveSecret: PropTypes.func.isRequired,
  saveState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
  secret: PropTypes.object,
  secretName: PropTypes.string.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { componentName, secretName }) => ({
  saveError: getSaveError(state, secretName),
  saveState: getSaveState(state, secretName),
  secret: getSecret(state, componentName, secretName),
});

const mapDispatchToProps = (
  dispatch,
  { appName, envName, componentName, secretName }
) => ({
  subscribe: () =>
    dispatch(actionCreators.subscribeEnvironment(appName, envName)),

  unsubscribe: (uAppName = appName, uEnvName = envName) =>
    dispatch(actionCreators.unsubscribeEnvironment(uAppName, uEnvName)),

  resetSaveStates: () => dispatch(secretActions.saveReset(secretName)),

  saveSecret: value =>
    dispatch(
      secretActions.saveRequest(
        appName,
        envName,
        componentName,
        secretName,
        value
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecretOverview);
