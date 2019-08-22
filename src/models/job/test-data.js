const normalSteps = Object.freeze([
  {
    name: 'A step',
    status: 'Waiting',
  },
  {
    name: 'B step',
    started: '2018-11-19T14:31:23Z',
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
    activeFrom: '2018-11-13T14:31:23Z',
  },
  {
    name: 'deployment-2',
    environment: 'env-2',
    activeFrom: '2018-11-19T14:31:23Z',
  },
]);

export default [
  {
    __testDescription: 'No target deployment',
    commitID: '1234abcdef4321',
    name: 'A Job',
    pipeline: 'build-deploy',
    created: '2018-11-19T14:31:23Z',
    started: '2018-11-19T14:31:23Z',
    status: 'Running',
    steps: normalSteps,
  },
  {
    __testDescription: 'Multiple deployments',
    commitID: '1234abcdef4321',
    components: normalComponents,
    deployments: normalDeployments,
    name: 'Another Job',
    pipeline: 'build-deploy',
    created: '2018-11-19T14:31:23Z',
    started: '2018-11-19T14:31:23Z',
    status: 'Running',
    steps: normalSteps,
  },
  {
    __testDescription: 'Finished',
    commitID: '1234abcdef4321',
    components: normalComponents,
    deployments: normalDeployments,
    name: 'Another Job',
    pipeline: 'build-deploy',
    created: '2018-11-19T14:31:23Z',
    started: '2018-11-19T14:31:23Z',
    ended: '2018-11-19T14:32:23Z',
    status: 'Succeeded',
    steps: normalSteps,
  },
  {
    __testDescription: 'Empty step list',
    commitID: '1234abcdef4321',
    components: normalComponents,
    deployments: normalDeployments,
    name: 'Another Job',
    pipeline: 'build-deploy',
    created: '2018-11-19T14:31:23Z',
    started: '2018-11-19T14:33:23Z',
    ended: '2018-11-19T14:34:23Z',
    status: 'Succeeded',
    steps: [],
  },
  {
    __testDescription: 'Queued job',
    commitID: '1234abcdef4321',
    components: null,
    created: '2018-11-19T14:33:23Z',
    deployments: null,
    ended: '',
    name: 'Another Job',
    pipeline: 'build-deploy',
    started: '',
    status: 'Queued',
    steps: null,
  },
  {
    __testDescription: 'Waiting for job to be scheduled by radix-operator',
    commitID: '1234abcdef4321',
    components: null,
    created: '2018-11-19T14:33:23Z',
    deployments: null,
    ended: '',
    name: 'Another Job',
    pipeline: 'build-deploy',
    started: '',
    status: 'Waiting',
    steps: null,
  },
];
