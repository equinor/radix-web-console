import React from 'react';

import AppList from '.';

export const injectMockSocketServers = servers => {
  // Provide mock socket response data on connection

  // TODO: When using only Socket.io, clean this up to provide only one socket
  // TODO: Move sample data into external files

  servers.rr.on('connection', socket =>
    socket.send(
      JSON.stringify({
        type: 'ADDED',
        object: {
          apiVersion: 'radix.equinor.com/v1',
          kind: 'RadixRegistration',
          metadata: {
            creationTimestamp: '2018-10-02T10:01:47Z',
            name: 'radix-api',
            namespace: 'default',
          },
          spec: {
            adGroups: ['604bad73-c53b-4a95-ab17-d7953f75c8c3'],
            cloneURL: 'git@github.com:Statoil/radix-api.git',
            repository: 'https://github.com/Statoil/radix-api',
            sharedSecret: 'WeakComponent',
          },
        },
      })
    )
  );

  servers.ra.on('connection', socket =>
    socket.send(
      JSON.stringify({
        type: 'ADDED',
        object: {
          apiVersion: 'radix.equinor.com/v1',
          kind: 'RadixApplication',
          metadata: {
            creationTimestamp: '2018-10-02T10:02:12Z',
            name: 'radix-api',
            namespace: 'radix-api-app',
          },
          spec: {
            components: [
              {
                dockerfileName: 'Dockerfile',
                name: 'server',
                ports: [
                  {
                    name: 'http',
                    port: 3002,
                  },
                ],
                public: true,
                replicas: 0,
                src: '.',
              },
            ],
            environments: [
              {
                authorization: null,
                name: 'prod',
              },
            ],
          },
        },
      })
    )
  );

  servers.jobs.on('connection', socket =>
    socket.send(
      JSON.stringify({
        type: 'ADDED',
        object: {
          kind: 'Job',
          apiVersion: 'batch/v1',
          metadata: {
            name: 'radix-builder-1igdh',
            namespace: 'radix-api-app',
            creationTimestamp: '2018-09-21T10:31:35Z',
            labels: {
              build: 'radix-api-1igdh',
            },
          },
          spec: {
            parallelism: 1,
            completions: 1,
            backoffLimit: 0,
            selector: {
              matchLabels: {
                'controller-uid': '83a9a3e9-bd89-11e8-805e-da22cd2d43c0',
              },
            },
            template: {
              metadata: {
                creationTimestamp: null,
                labels: {
                  'controller-uid': '83a9a3e9-bd89-11e8-805e-da22cd2d43c0',
                  'job-name': 'radix-builder-1igdh',
                },
              },
              spec: {
                volumes: [
                  {
                    name: 'build-context',
                    emptyDir: {},
                  },
                  {
                    name: 'git-ssh-keys',
                    secret: {
                      secretName: 'git-ssh-keys',
                      defaultMode: 256,
                    },
                  },
                  {
                    name: 'docker-config',
                    secret: {
                      secretName: 'radix-docker',
                      defaultMode: 420,
                    },
                  },
                ],
                initContainers: [
                  {
                    name: 'clone',
                    image: 'alpine:3.7',
                    command: ['/bin/sh', '-c'],
                    args: [
                      'apk add --no-cache bash openssh-client git && ls /root/.ssh && cd /workspace && git clone git@github.com:Statoil/radix-api.git -b master .',
                    ],
                    resources: {},
                    volumeMounts: [
                      {
                        name: 'build-context',
                        mountPath: '/workspace',
                      },
                      {
                        name: 'git-ssh-keys',
                        readOnly: true,
                        mountPath: '/root/.ssh',
                      },
                    ],
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    imagePullPolicy: 'IfNotPresent',
                  },
                ],
                containers: [
                  {
                    name: 'build-app',
                    image: 'gcr.io/kaniko-project/executor:latest',
                    args: [
                      '--dockerfile=/workspace/Dockerfile',
                      '--context=/workspace/',
                      '--destination=radixdev.azurecr.io/radix-api-app:1igdh',
                    ],
                    env: [
                      {
                        name: 'DOCKER_CONFIG',
                        value: '/kaniko/secrets',
                      },
                    ],
                    resources: {},
                    volumeMounts: [
                      {
                        name: 'build-context',
                        mountPath: '/workspace',
                      },
                      {
                        name: 'docker-config',
                        readOnly: true,
                        mountPath: '/kaniko/secrets',
                      },
                    ],
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    imagePullPolicy: 'Always',
                  },
                  {
                    name: 'build-redis',
                    image: 'gcr.io/kaniko-project/executor:latest',
                    args: [
                      '--dockerfile=/workspace/redis/Dockerfile',
                      '--context=/workspace/redis/',
                      '--destination=radixdev.azurecr.io/radix-api-redis:1igdh',
                    ],
                    env: [
                      {
                        name: 'DOCKER_CONFIG',
                        value: '/kaniko/secrets',
                      },
                    ],
                    resources: {},
                    volumeMounts: [
                      {
                        name: 'build-context',
                        mountPath: '/workspace',
                      },
                      {
                        name: 'docker-config',
                        readOnly: true,
                        mountPath: '/kaniko/secrets',
                      },
                    ],
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    imagePullPolicy: 'Always',
                  },
                ],
                restartPolicy: 'Never',
                terminationGracePeriodSeconds: 30,
                dnsPolicy: 'ClusterFirst',
                securityContext: {},
                schedulerName: 'default-scheduler',
              },
            },
          },
          status: {
            conditions: [
              {
                type: 'Complete',
                status: 'True',
                lastProbeTime: '2018-09-21T10:32:36Z',
                lastTransitionTime: '2018-09-21T10:32:36Z',
              },
            ],
            startTime: '2018-09-21T10:31:35Z',
          },
        },
      })
    )
  );
};

export default <AppList />;
