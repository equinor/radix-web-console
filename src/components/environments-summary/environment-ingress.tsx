import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { type IconData, link, memory } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';

import type { Component } from '../../store/radix-api';
import {
  getActiveComponentUrl,
  getActiveJobComponentUrl,
} from '../../utils/routing';

export interface EnvironmentIngressProps {
  appName: string;
  envName: string;
  components: Readonly<Array<Component>>;
}

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';
const MAX_DISPLAY_COMPONENTS = 2;

function getComponentUrl(
  appName: string,
  environmentName: string,
  component: Readonly<Component>
): string {
  return component.type === 'job'
    ? getActiveJobComponentUrl(appName, environmentName, component.name)
    : getActiveComponentUrl(appName, environmentName, component.name);
}

const ComponentDetails: FunctionComponent<{
  icon: IconData;
  component: Readonly<Component>;
}> = ({ icon, component }) => (
  <>
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
    {component.status === 'Outdated' && (
      <Typography
        color="warning"
        variant="caption"
        token={{ textAlign: 'right' }}
      >
        outdated image
      </Typography>
    )}
  </>
);

export const EnvironmentIngress: FunctionComponent<EnvironmentIngressProps> = ({
  appName,
  envName,
  components,
}) => {
  const comps = components.reduce<{
    public: Array<Component>;
    passive: Array<Component>;
  }>(
    (obj, x) => {
      obj[!x.variables[URL_VAR_NAME] ? 'passive' : 'public'].push(x);
      return obj;
    },
    { public: [], passive: [] }
  );

  const tooManyPublic = comps.public.length > MAX_DISPLAY_COMPONENTS;
  const tooManyPassive = comps.passive.length > MAX_DISPLAY_COMPONENTS;

  if (tooManyPublic) {
    comps.public = comps.public.slice(0, MAX_DISPLAY_COMPONENTS);
  }
  if (tooManyPassive) {
    comps.passive = comps.passive.slice(0, MAX_DISPLAY_COMPONENTS);
  }

  return (
    <>
      {comps.public.length > 0 ? (
        comps.public.map((component) => (
          <Button
            key={component.name}
            className="button_link"
            variant="ghost"
            href={`https://${component.variables[URL_VAR_NAME]}`}
          >
            <ComponentDetails icon={link} component={component} />
          </Button>
        ))
      ) : (
        <Button variant="ghost" className="button_link" disabled>
          <span>
            <Icon data={link} /> No link available
          </span>
        </Button>
      )}
      {comps.passive
        .filter(({ status }) => status === 'Outdated')
        .map((component) => (
          <Button
            key={component.name}
            className="button_link"
            variant="ghost"
            href={getComponentUrl(appName, envName, component)}
          >
            <ComponentDetails icon={memory} component={component} />
          </Button>
        ))}
      {tooManyPublic && tooManyPassive && <div>…</div>}
    </>
  );
};

EnvironmentIngress.propTypes = {
  appName: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<Component>
  ).isRequired,
  envName: PropTypes.string.isRequired,
};
