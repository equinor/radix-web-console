import { connect } from 'react-redux';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import Alert from '../alert';

import DockerImage from '../docker-image';
import AsyncResource from '../async-resource';
import Toolbar from './toolbar';

import { getAppAlias } from '../../state/application';
import { getComponent } from '../../state/environment';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import componentModel from '../../models/component';
import EnvVariables from '../active-component/env-variables';
import HorizontalScalingSummary from './horizontal-scaling-summary';
import DefaultAlias from './default-alias';
import ComponentSecrets from '../active-component/component-secrets';
import ComponentPorts from '../active-component/component-ports';
import ReplicaList from './replica-list';
import ComponentBredcrumb from '../active-component/component-bred-crumb';
const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';

export class ActiveComponentOverview extends React.Component {
  componentDidMount() {
    this.props.subscribe(this.props.appName, this.props.envName);
  }
  componentDidUpdate(prevProps) {
    const { appName, envName } = this.props;

    if (appName !== prevProps.appName || envName !== prevProps.envName) {
      this.props.unsubscribe(prevProps.appName, prevProps.envName);
      this.props.subscribe(appName, envName);
    }
  }

  componentWillUnmount() {
    this.props.unsubscribe(this.props.appName, this.props.envName);
  }

  render() {
    const { appAlias, appName, envName, componentName, component } = this.props;
    return (
      <React.Fragment>
        <ComponentBredcrumb
          appName={appName}
          componentName={componentName}
          envName={envName}
        />
        <main>
          <AsyncResource
            resource="ENVIRONMENT"
            resourceParams={[appName, envName]}
          >
            {component && (
              <React.Fragment>
                <Toolbar
                  appName={appName}
                  envName={envName}
                  component={component}
                />
                <div className="o-layout-columns">
                  <section>
                    <h2 className="o-heading-section">Overview</h2>
                    <p>
                      Component <strong>{component.name}</strong>
                    </p>
                    {component.status === 'Stopped' && (
                      <Alert>
                        Component has been manually stopped; please note that a
                        new deployment will cause it to be restarted unless you
                        set <code>replicas</code> of the component to{' '}
                        <code>0</code> in{' '}
                        <a href="https://www.radix.equinor.com/docs/reference-radix-config/#replicas">
                          radixconfig.yaml
                        </a>
                      </Alert>
                    )}
                    <p>
                      Status <strong>{component.status}</strong>
                    </p>
                    {component.variables[URL_VAR_NAME] && (
                      <p>
                        Publicly available{' '}
                        <a
                          href={`https://${component.variables[URL_VAR_NAME]}`}
                        >
                          link <FontAwesomeIcon icon={faLink} size="lg" />
                        </a>
                      </p>
                    )}
                    <DefaultAlias
                      appAlias={appAlias}
                      componentName={componentName}
                      envName={envName}
                    ></DefaultAlias>
                    <p>
                      Image <DockerImage path={component.image} />
                    </p>
                    <ComponentPorts ports={component.ports} />
                    <EnvVariables
                      component={component}
                      includeRadixVars={true}
                    />
                  </section>
                  <section>
                    <HorizontalScalingSummary
                      component={component}
                    ></HorizontalScalingSummary>
                    <ReplicaList
                      appName={appName}
                      envName={envName}
                      componentName={componentName}
                      replicaList={component.replicaList}
                    ></ReplicaList>
                    <ComponentSecrets
                      appName={appName}
                      componentName={componentName}
                      envName={envName}
                      secrets={component.secrets}
                    ></ComponentSecrets>
                  </section>
                </div>
              </React.Fragment>
            )}
          </AsyncResource>
        </main>
      </React.Fragment>
    );
  }
}

ActiveComponentOverview.propTypes = {
  appAlias: PropTypes.exact({
    componentName: PropTypes.string.isRequired,
    environmentName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  component: PropTypes.shape(componentModel),
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { componentName }) => ({
  appAlias: getAppAlias(state),
  component: getComponent(state, componentName),
});

const mapDispatchToProps = (dispatch) => ({
  subscribe: (appName, envName) => {
    dispatch(subscriptionActions.subscribeEnvironment(appName, envName));
    dispatch(subscriptionActions.subscribeApplication(appName));
  },
  unsubscribe: (appName, envName) => {
    dispatch(subscriptionActions.unsubscribeEnvironment(appName, envName));
    dispatch(subscriptionActions.unsubscribeApplication(appName));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveComponentOverview);
