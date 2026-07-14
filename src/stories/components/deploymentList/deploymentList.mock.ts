import type { DeploymentSummary } from '../../../store/radix-api'

const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

export const repository = 'https://github.com/equinor/radix-web-console'

export const mockedDeployments: Array<DeploymentSummary> = [
  // Active deployment (no activeTo) built from a commit
  {
    name: 'qa-s7zie-vlok4myf',
    createdByJob: 'radix-pipeline-20240124132335-s7zie',
    environment: 'qa',
    activeFrom: daysAgo(1),
    status: 'Ready',
    pipelineJobType: 'build-deploy',
    gitCommitHash: 'ef85c7aeb7351de6918004facfda336def3a1f76',
  },
  // Active deployment promoted from another environment
  {
    name: 'prod-tq9nx-l0jaycnm',
    createdByJob: 'radix-pipeline-20240122134007-tq9nx',
    environment: 'prod',
    activeFrom: daysAgo(2),
    status: 'Ready',
    pipelineJobType: 'promote',
    promotedFromEnvironment: 'qa',
    gitCommitHash: '37af2a3d841e4d4479373e467caccf550846d418',
  },
  // Inactive deployment (superseded)
  {
    name: 'qa-cg4hz-xx1fbluj',
    createdByJob: 'radix-pipeline-20240124081746-cg4hz',
    environment: 'qa',
    activeFrom: daysAgo(3),
    activeTo: daysAgo(1),
    status: 'Inactive',
    pipelineJobType: 'build-deploy',
    gitCommitHash: '292d36c392ccbaba32b419ae56e08dcdd92b8412',
  },
  // Inactive deploy-only job
  {
    name: 'dev-y8ib5-kjtalhmj',
    createdByJob: 'radix-pipeline-20240122134120-y8ib5',
    environment: 'dev',
    activeFrom: daysAgo(5),
    activeTo: daysAgo(3),
    status: 'Inactive',
    pipelineJobType: 'deploy',
    commitID: '393cb144cd079886c076285167e23a23c2c783c4',
  },
  // Inactive deployment without a commit hash
  {
    name: 'prod-nje0n-0wrmvkmv',
    environment: 'prod',
    activeFrom: daysAgo(7),
    activeTo: daysAgo(2),
    status: 'Inactive',
    pipelineJobType: 'build-deploy',
  },
]
