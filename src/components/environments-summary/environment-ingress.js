import React from 'react';

import usePollComponents from './use-poll-components';

import { Icon, Button, Typography, Tooltip } from '@equinor/eds-core-react';
import { link, memory, error_outlined } from '@equinor/eds-icons';

import { componentType } from '../../models/component-type';
import * as routing from '../../utils/routing';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';
const MAX_DISPLAY_NR_COMPONENT = 2;

const outdatedOrFailedComponent = (component, msg) => {
  if (component.status === 'Outdated') {
    return msg === 'short' ? (
      <Typography
        color="warning"
        variant="caption"
        token={{ textAlign: 'right' }}
      >
        outdated image
      </Typography>
    ) : (
      <Typography variant="caption" token={{ textAlign: 'right' }}>
        is running an outdated image
      </Typography>
    );
  } else if (component.status === 'Failing' || component.status === 'Failed') {
    const title =
      component.status === 'Failing'
        ? 'Component is failing'
        : 'Component failed';
    return (
      <Tooltip title={title} placement="top">
        <Icon data={error_outlined} className="error" />
      </Tooltip>
    );
  }
};

const EnvironmentIngress = ({ appName, deploymentName, envName }) => {
  const [componentsPollState] = usePollComponents(
    appName,
    deploymentName,
    envName
  );

  const components =
    componentsPollState && componentsPollState.data
      ? componentsPollState.data
      : null;
  if (!components || components.length <= 0) {
    return null;
  }

  let publicComponents = components.filter((x) => x.variables[URL_VAR_NAME]);
  let passiveComponents = components.filter((x) => !x.variables[URL_VAR_NAME]);

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
    return component.type === componentType.job
      ? routing.getActiveJobComponentUrl(
          appName,
          environmentName,
          component.name
        )
      : routing.getActiveComponentUrl(appName, environmentName, component.name);
  }

  function componentDetails(icon, component, msg) {
    return (
      <React.Fragment>
        <Icon data={icon} />
        <Typography
          className="component_details"
          token={{
            color: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
          }}
        >
          {component.name}
        </Typography>
        {outdatedOrFailedComponent(component, msg)}
      </React.Fragment>
    );
  }

  return (
    <>
      {!publicComponents.length && (
        <Button variant="ghost" className="button_link" disabled>
          <span>
            <Icon data={link} /> No link available
          </span>
        </Button>
      )}
      {publicComponents.map((component) => (
        <Button
          key={component.name}
          variant="ghost"
          href={`https://${component.variables[URL_VAR_NAME]}`}
          className="button_link"
        >
          {componentDetails(link, component, 'short')}
        </Button>
      ))}
      {passiveComponents.map(
        (component) =>
          (component.status === 'Failed' ||
            component.status === 'Outdated') && (
            <Button
              key={component.name}
              variant="ghost"
              href={getActiveComponentUrl(appName, envName, component)}
              className="button_link"
            >
              {componentDetails(memory, component, '')}
            </Button>
          )
      )}
      {tooManyPublicComponents && tooManyPassiveComponents && <div>...</div>}
    </>
  );
};

export default EnvironmentIngress;
