import React from 'react';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import usePollComponents from './use-poll-components';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';
const MAX_DISPLAY_NR_COMPONENT = 4;

const outdatedOrFailedComponent = (component) => {
  console.log(component);
  if (component.status === 'Outdated') {
    return (
      <span
        class="env-summary-image-outdated-warning"
        title="Image is outdated"
      >
        <FontAwesomeIcon icon={faExclamationCircle} />
      </span>
    );
  }
  if (component.status === 'Failing') {
    return (
      <span class="env-summary-image-outdated" title="Component is failing">
        <FontAwesomeIcon icon={faExclamationCircle} />
      </span>
    );
  }
};

const EnvironmentIngress = ({ components }) => {
  // const [componentsPollState] = usePollComponents(appName, deploymentName);
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

  return (
    <div>
      <ul>
        {publicComponents.map((component) => (
          <li key={component.name} class="env-summary-component-list">
            <div class="ingress-container">
              <a href={`https://${component.variables[URL_VAR_NAME]}`}>
                {component.name} <FontAwesomeIcon icon={faLink} size="lg" />
              </a>
              {outdatedOrFailedComponent(component)}
            </div>
          </li>
        ))}
        {passiveComponents.map((component) => (
          <li key={component.name} class="env-summary-component-list">
            <div class="ingress-container">
              <b>{component.name}</b>
              {outdatedOrFailedComponent(component)}
            </div>
          </li>
        ))}
        {tooManyPublicComponents && tooManyPassiveComponents && <li>...</li>}
      </ul>
    </div>
  );
};

export default EnvironmentIngress;
