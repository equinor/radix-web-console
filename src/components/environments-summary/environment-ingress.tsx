import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { IconData, link, memory } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/radix-api/deployments/component';
import { ComponentStatus } from '../../models/radix-api/deployments/component-status';
import { ComponentType } from '../../models/radix-api/deployments/component-type';
import {
  getActiveComponentUrl,
  getActiveJobComponentUrl,
} from '../../utils/routing';

export interface EnvironmentIngressProps {
  appName: string;
  envName: string;
  components: Array<ComponentModel>;
}

const URL_VAR_NAME: string = 'RADIX_PUBLIC_DOMAIN_NAME';
const MAX_DISPLAY_COMPONENTS: number = 2;

function getComponentUrl(
  appName: string,
  environmentName: string,
  component: ComponentModel
): string {
  return component.type === ComponentType.job
    ? getActiveJobComponentUrl(appName, environmentName, component.name)
    : getActiveComponentUrl(appName, environmentName, component.name);
}

const ComponentDetails = ({
  icon,
  component,
}: {
  icon: IconData;
  component: ComponentModel;
}): JSX.Element => (
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
    {component.status === ComponentStatus.ComponentOutdated && (
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

export const EnvironmentIngress = ({
  appName,
  envName,
  components,
}: EnvironmentIngressProps): JSX.Element => {
  if (!(components?.length > 0)) return <></>;

  const comps = components.reduce<{
    public: Array<ComponentModel>;
    passive: Array<ComponentModel>;
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
        .filter((x) => x.status === ComponentStatus.ComponentOutdated)
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
      {tooManyPublic && tooManyPassive && <div>...</div>}
    </>
  );
};

EnvironmentIngress.propTypes = {
  appName: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(PropTypes.shape(ComponentModelValidationMap))
    .isRequired,
  envName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<EnvironmentIngressProps>;
