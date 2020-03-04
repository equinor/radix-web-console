import React from 'react';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import usePollComponents from './use-poll-components';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';
const MAX_DISPLAY_NR_COMPONENT = 3;

const EnvironmentIngress = ({ appName, deploymentName }) => {
  const [componentsPollState] = usePollComponents(appName, deploymentName);
  let components = [];
  if (componentsPollState && componentsPollState.data) {
    components = componentsPollState.data.filter(
      component => component.variables[URL_VAR_NAME]
    );
  }

  if (components.length <= 0) {
    return <div />;
  }
  const tooManyPublicComponents = components.length > MAX_DISPLAY_NR_COMPONENT;
  if (tooManyPublicComponents) {
    components = components.slice(0, MAX_DISPLAY_NR_COMPONENT);
  }

  return (
    <div>
      <ul>
        {components.map(component => (
          <li key={component.name}>
            <a href={`https://${component.variables[URL_VAR_NAME]}`}>
              {component.name} <FontAwesomeIcon icon={faLink} size="lg" />
            </a>
          </li>
        ))}
        {tooManyPublicComponents && <li>...</li>}
      </ul>
    </div>
  );
};

export default EnvironmentIngress;
