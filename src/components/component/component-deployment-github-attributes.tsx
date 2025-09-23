import { Progress, Typography } from '@equinor/eds-core-react'
import type { Component, Deployment } from '../../store/radix-api'
import { GitCommitTags } from './git-commit-tags'

interface ComponentDeploymentGitHubAttributesProps {
  deployComponent?: Component
  deployment?: Deployment
}

export const ComponentDeploymentGitHubAttributes = ({
  deployComponent,
  deployment,
}: ComponentDeploymentGitHubAttributesProps) => {
  return (
    <>
      {deployComponent ? (
        <>
          {deployComponent.commitID && (
            <Typography>
              From {deployment?.gitCommitHash !== deployComponent.commitID ? 'past deployment ' : ''}
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
  )
}
