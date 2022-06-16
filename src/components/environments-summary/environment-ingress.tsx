import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { IconData, link, memory } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import { useGetComponents } from './use-get-components';

import { ComponentModel } from '../../models/component';
import { ComponentStatus } from '../../models/component-status';
import { ComponentType } from '../../models/component-type';
import {
  getActiveComponentUrl,
  getActiveJobComponentUrl,
} from '../../utils/routing';

export interface EnvironmentIngressProps {
  appName: string;
  deploymentName: string;
  envName: string;
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
  deploymentName,
  envName,
}: EnvironmentIngressProps): JSX.Element => {
  const [componentsState] = useGetComponents(appName, deploymentName);
  if (!(componentsState?.data?.length > 0)) {
    // no data
    return <></>;
  }

  const components = componentsState.data.reduce<{
    public: Array<ComponentModel>;
    passive: Array<ComponentModel>;
  }>(
    (obj, x) => {
      obj[!x.variables[URL_VAR_NAME] ? 'passive' : 'public'].push(x);
      return obj;
    },
    { public: [], passive: [] }
  );

  const tooManyPublic = components.public.length > MAX_DISPLAY_COMPONENTS;
  const tooManyPassive = components.passive.length > MAX_DISPLAY_COMPONENTS;

  if (tooManyPublic) {
    components.public = components.public.slice(0, MAX_DISPLAY_COMPONENTS);
  }
  if (tooManyPassive) {
    components.passive = components.passive.slice(0, MAX_DISPLAY_COMPONENTS);
  }

  return (
    <>
      {components.public.length > 0 ? (
        components.public.map((component) => (
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
      {components.passive
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
  deploymentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<EnvironmentIngressProps>;
