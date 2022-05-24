import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { link, memory } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import { useGetComponents } from './use-get-components';

import { ComponentStatus } from '../../models/component-status';
import { ComponentType } from '../../models/component-type';
import {
  getActiveComponentUrl,
  getActiveJobComponentUrl,
} from '../../utils/routing';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';
const MAX_DISPLAY_COMPONENTS = 2;

function getComponentUrl(appName, environmentName, component) {
  return component.type === ComponentType.job
    ? getActiveJobComponentUrl(appName, environmentName, component.name)
    : getActiveComponentUrl(appName, environmentName, component.name);
}

const ComponentDetails = ({ icon, component }) => (
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

export const EnvironmentIngress = ({ appName, deploymentName, envName }) => {
  const [componentsState] = useGetComponents(appName, deploymentName, envName);

  const components = componentsState?.data;
  if (!components || components.length <= 0) {
    return <></>;
  }

  const sortedComps = components.reduce(
    (sorted, x) => {
      sorted[!x.variables[URL_VAR_NAME] ? 'passive' : 'public'].push(x);
      return sorted;
    },
    { public: [], passive: [] }
  );

  const tooManyPublicComps = sortedComps.public.length > MAX_DISPLAY_COMPONENTS;
  const tooManyPassiveComps =
    sortedComps.passive.length > MAX_DISPLAY_COMPONENTS;

  if (tooManyPublicComps) {
    sortedComps.public = sortedComps.public.slice(0, MAX_DISPLAY_COMPONENTS);
  }
  if (tooManyPassiveComps) {
    sortedComps.passive = sortedComps.passive.slice(0, MAX_DISPLAY_COMPONENTS);
  }

  return (
    <>
      {sortedComps.public.length > 0 ? (
        sortedComps.public.map((component) => (
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
      {sortedComps.passive
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
      {tooManyPublicComps && tooManyPassiveComps && <div>...</div>}
    </>
  );
};

EnvironmentIngress.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
};

export default EnvironmentIngress;
