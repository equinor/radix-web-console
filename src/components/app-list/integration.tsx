import type { Server } from 'mock-socket'

import AppList from '.'

export const injectMockSocketServers = (servers: { rr: Server; ra: Server }): void => {
  // Provide mock socket response data on connection

  // TODO: When using only Socket.io, clean this up to provide only one socket
  // TODO: Move sample data into external files

  servers.rr.on('connection', (socket) =>
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
            cloneURL: 'git@github.com:equinor/radix-api.git',
            repository: 'https://github.com/equinor/radix-api',
            // file deepcode ignore HardcodedNonCryptoSecret: a fake secret used for testing
            sharedSecret: 'WeakComponent',
          },
        },
      })
    )
  )

  servers.ra.on('connection', (socket) =>
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
                ports: [{ name: 'http', port: 3002 }],
                public: true,
                replicas: 0,
                src: '.',
              },
            ],
            environments: [{ authorization: null, name: 'prod' }],
          },
        },
      })
    )
  )
}

export default <AppList />
