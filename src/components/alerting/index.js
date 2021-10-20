import { AlertingConfigModel } from '../../models/alerting';
import PropTypes from 'prop-types';
import { getEnvironmentAlerting } from '../../state/environment-alerting';
import alertingActions from '../../state/environment-alerting/action-creators';
import { connect } from 'react-redux';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import { useEffect } from 'react';
import AsyncResource from '../async-resource';
import { Button, Typography } from '@equinor/eds-core-react';

const AlertingDisabled = () => {
  return (
    <>
      <Typography>Alerting is disabled</Typography>
    </>
  );
};
const AlertingEnabled = () => {
  return (
    <>
      <Typography>Alerting is enabled</Typography>
    </>
  );
};

const AlertingConfig = ({ config }) => {
  if (!config) {
    return <div>null config</div>;
  }
  return <>{config.enabled ? <AlertingEnabled /> : <AlertingDisabled />}</>;
};

AlertingConfig.propTypes = {
  config: PropTypes.shape(AlertingConfigModel),
};

const Alerting = ({
  appName,
  envName,
  environmentAlerting,
  subscribe,
  unsubscribe,
  enableAlerting,
  disableAlerting,
}) => {
  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    };
  }, [subscribe, unsubscribe]);

  const onEnableAlerting = (ev) => {
    ev.preventDefault();
    console.log('enable alerting');
    enableAlerting(appName, envName);
  };

  const onDisableAlerting = (ev) => {
    ev.preventDefault();
    console.log('disable alerting');
    disableAlerting(appName, envName);
  };

  return (
    <>
      <AsyncResource
        resource="ENVIRONMENT_ALERTING"
        resourceParams={[appName, envName]}
      >
        {environmentAlerting && (
          <div>
            <AlertingConfig config={environmentAlerting} />
            {environmentAlerting.enabled ? (
              <Button color="danger" onClick={onDisableAlerting}>
                Disable
              </Button>
            ) : (
              <Button onClick={onEnableAlerting}>Enable</Button>
            )}
          </div>
        )}
      </AsyncResource>
    </>
  );
};

Alerting.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  environmentAlerting: PropTypes.shape(AlertingConfigModel),
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  enableAlerting: PropTypes.func.isRequired,
  disableAlerting: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  environmentAlerting: getEnvironmentAlerting(state),
});

const mapDispatchToProps = (dispatch, { appName, envName }) => ({
  enableAlerting: (appName, envName) =>
    dispatch(
      alertingActions.enableEnvironmentAlertingRequest(appName, envName)
    ),
  disableAlerting: (appName, envName) =>
    dispatch(
      alertingActions.disableEnvironmentAlertingRequest(appName, envName)
    ),
  subscribe: () => {
    dispatch(
      subscriptionActions.subscribeEnvironmentAlerting(appName, envName)
    );
  },
  unsubscribe: (oldAppName = appName, oldEnvName = envName) => {
    dispatch(
      subscriptionActions.unsubscribeEnvironmentAlerting(oldAppName, oldEnvName)
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Alerting);
