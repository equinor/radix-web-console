import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { DockerImage } from '../docker-image';
import { routes } from '../../routes';
import { Component, Deployment } from '../../store/radix-api';
import { routeWithParams } from '../../utils/string';
import { GitCommitTags } from '../component/git-commit-tags';

type Props = {
  appName: string;
  deployment: Deployment;
  components?: Array<Component>;
};

export const DeploymentComponentList = ({
  appName,
  deployment,
  components,
}: Props) => (
  <>
    {components && (
      <>
        <Typography variant="h4">Components</Typography>
        {components.map((component) => (
          <Typography key={component.name}>
            <Typography
              as={Link}
              to={routeWithParams(routes.appComponent, {
                appName,
                deploymentName: deployment.name,
                componentName: component.name,
              })}
              link
            >
              {component.name}
            </Typography>{' '}
            image <DockerImage path={component.image} />
            {component.skipDeployment && (
              <>
                {' keeps deployment '}
                <GitCommitTags
                  commitID={component.commitID}
                  // gitTags={component.gitTags}
                  repository={deployment.repository}
                />
              </>
            )}
          </Typography>
        ))}
      </>
    )}
  </>
);

DeploymentComponentList.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.object.isRequired as PropTypes.Validator<Deployment>,
  components: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<Component>
  ),
};
