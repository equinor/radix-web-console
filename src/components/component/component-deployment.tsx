import { Progress, Typography } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import { useGetDeploymentQuery } from '../../store/radix-api';
import { routeWithParams, smallDeploymentName } from '../../utils/string';
import { GitCommitTags } from './git-commit-tags';

interface ComponentDeploymentProps {
  appName: string;
  deploymentName: string;
  componentName: string;
}

export const ComponentDeployment = ({
  appName,
  deploymentName,
  componentName,
}: ComponentDeploymentProps) => {
  const { data: deployment } = useGetDeploymentQuery({
    appName,
    deploymentName,
  });
  const deployComponent = deployment?.components?.find(
    (component) => component.name === componentName
  );
  const deploymentLink = routeWithParams(routes.appDeployment, {
    appName,
    deploymentName,
  });

  return (
    <>
      <Typography>
        Deployment{' '}
        <Typography
          className="deployment-summary__link"
          as={Link}
          to={deploymentLink}
          link
          token={{ textDecoration: 'none' }}
        >
          {smallDeploymentName(deploymentName)}
        </Typography>
      </Typography>
      {deployComponent ? (
        <>
          {deployComponent.commitID && (
            <Typography>
              From{' '}
              {deployment?.gitCommitHash !== deployComponent.commitID
                ? 'past deployment '
                : ''}
              <GitCommitTags
                commitID={deployComponent.commitID}
                gitTags={deployComponent.gitTags}
                repository={deployment?.repository ?? ''}
              />
            </Typography>
          )}
        </>
      ) : (
        <Typography>
          From <Progress.Circular size={16} />
        </Typography>
      )}
    </>
  );
};
