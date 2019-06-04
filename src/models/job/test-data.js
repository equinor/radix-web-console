const normalSteps = Object.freeze([
  {
    name: 'A step',
    status: 'Pending',
  },
  {
    name: 'B step',
    started: '1557000000000',
    status: 'Running',
  },
]);

const normalComponents = Object.freeze([
  {
    name: 'component-a',
    image: 'an-image',
  },
  {
    name: 'component-b',
    image: 'another-image',
  },
]);

const normalDeployments = Object.freeze([
  {
    name: 'deployment-1',
    environment: 'env-1',
    activeFrom: '1556999000000',
  },
  {
    name: 'deployment-2',
    environment: 'env-2',
    activeFrom: '1556999000000',
  },
]);

export default [
  {
    __testDescription: 'No target deployment',
    commitID: '1234abcdef4321',
    name: 'A Job',
    pipeline: 'build-deploy',
    started: 1557000000000,
    status: 'Running',
    steps: normalSteps,
  },
  {
    __testDescription: 'Multiple deployments',
    commitID: '1234abcdef4321',
    components: normalComponents,
    deployments: normalDeployments,
    environments: ['production', 'qa', 'dev'],
    name: 'Another Job',
    pipeline: 'build-deploy',
    started: 1557000000000,
    status: 'Running',
    steps: normalSteps,
  },
  {
    __testDescription: 'Finished',
    commitID: '1234abcdef4321',
    components: normalComponents,
    deployments: normalDeployments,
    environments: ['production', 'qa', 'dev'],
    name: 'Another Job',
    pipeline: 'build-deploy',
    started: 1557000000000,
    ended: 1557000100000,
    status: 'Succeeded',
    steps: normalSteps,
  },
  {
    __testDescription: 'Empty step list',
    commitID: '1234abcdef4321',
    components: normalComponents,
    deployments: normalDeployments,
    environments: ['dev'],
    name: 'Another Job',
    pipeline: 'build-deploy',
    started: 1557000000000,
    ended: 1557000100000,
    status: 'Succeeded',
    steps: [],
  }
];
