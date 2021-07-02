import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import usePollComponents from './use-poll-components';

import { Icon, Button, Typography } from '@equinor/eds-core-react';
import { link, memory } from '@equinor/eds-icons';

import { componentType } from '../../models/component-type';
import * as routing from '../../utils/routing';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';
const MAX_DISPLAY_NR_COMPONENT = 2;

const outdatedOrFailedComponent = (component, msg) => {
  if (component.status === 'Outdated') {
    if (msg === 'short') {
      return (
        <Typography variant="body_short" color="warning" as="span">
          outdated image
        </Typography>
      );
    }
    return <span>is running an outdated image</span>;
  }
  if (component.status === 'Failing') {
    return (
      <span
        className="env-summary-image-outdated-warning"
        title="Component is failing"
      >
        <FontAwesomeIcon icon={faExclamationCircle} />
      </span>
    );
  }
};

const EnvironmentIngress = ({ appName, deploymentName, envName }) => {
  const [componentsPollState] = usePollComponents(
    appName,
    deploymentName,
    envName
  );

  let components = [];
  if (componentsPollState && componentsPollState.data) {
    components = componentsPollState.data;
  }

  let publicComponents = [];
  let passiveComponents = [];
  if (components) {
    publicComponents = components.filter(
      (comp) => comp.variables[URL_VAR_NAME]
    );
    passiveComponents = components.filter(
      (comp) => !comp.variables[URL_VAR_NAME]
    );
  }

  if (components.length <= 0) {
    return <div />;
  }
  const tooManyPublicComponents =
    publicComponents.length > MAX_DISPLAY_NR_COMPONENT;

  const tooManyPassiveComponents =
    passiveComponents.length > MAX_DISPLAY_NR_COMPONENT;

  if (tooManyPublicComponents) {
    publicComponents = publicComponents.slice(0, MAX_DISPLAY_NR_COMPONENT);
  }

  if (tooManyPassiveComponents) {
    passiveComponents = passiveComponents.slice(0, MAX_DISPLAY_NR_COMPONENT);
  }

  function getActiveComponentUrl(appName, environmentName, component) {
    if (component.type === componentType.job)
      return routing.getActiveJobComponentUrl(
        appName,
        environmentName,
        component.name
      );
    return routing.getActiveComponentUrl(
      appName,
      environmentName,
      component.name
    );
  }

  return (
    <>
      {publicComponents.map((component) => (
        <React.Fragment key={component.name}>
          <Button
            variant="ghost"
            href={`https://${component.variables[URL_VAR_NAME]}`}
            fullWidth
          >
            <span>
              <Icon data={link} /> {component.name}{' '}
              {outdatedOrFailedComponent(component, 'short')}
            </span>
          </Button>
        </React.Fragment>
      ))}
      {passiveComponents.map(
        (component) =>
          (component.status === 'Failed' ||
            component.status === 'Outdated') && (
            <Typography variant="body_short">
              <Icon data={memory} />
              <a href={getActiveComponentUrl(appName, envName, component)}>
                {component.name}
              </a>{' '}
              {outdatedOrFailedComponent(component)}
            </Typography>
          )
      )}
      {tooManyPublicComponents && tooManyPassiveComponents && <div>...</div>}
    </>
  );
};

export default EnvironmentIngress;
