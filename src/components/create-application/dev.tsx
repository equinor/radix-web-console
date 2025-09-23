import { Divider } from '@equinor/eds-core-react'
import { useState } from 'react'
import type { DeployKeyAndSecret } from '../../store/radix-api'
import { CreateApplicationScrim } from './create-application-scrim'

export default (
  <div
    style={{
      width: '60%',
      margin: '16px auto',
      backgroundColor: '#FFF',
      padding: '16px',
    }}
  >
    <TestComponent />
    <Divider />
  </div>
)

function TestComponent() {
  const [secrets, setSecrets] = useState<DeployKeyAndSecret>()

  return (
    <CreateApplicationScrim
      secrets={secrets}
      onRefreshApps={() => console.log('Refresh apps...')}
      onCreateApplication={async (_, ackWarnings) => {
        if (!ackWarnings) return ['This is a warning, you should acknowledge it before continuing']

        setSecrets({
          sharedSecret: crypto.randomUUID(),
          publicDeployKey:
            'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDV+H/ZpDJ+gLw1oT3JaTsjR5N2LwPsAwobUKA6FnZrUwehTP1XlKG26qHv3cQZCHpRVPF7RNzCUKtyEffFU9eE5SrLoxxL/1iUaVPI7kFYZSt1TZKOhGn3WQdlb+miGZvHow6vR9K3QloNNV0L/oFQKjTJkyRf1odkkTCNzXMaEEeo0uOzBy5ZY9zaSWMOStzHMX0Ta/4LVXkGF9aJba3OJM6eipVyZ9nDP5C3UIH1y9X7ZfOTOQ338VBRMrPRKQ6cyzOaT48GNdwnJdGJpq666vYfqit5PO68c6bG5FlIfiypbaLW0mBTNYE1O+LHfYJu3Acd7CldVqcz6GP9rl9L',
        })
        return [] as string[]
      }}
    />
  )
}
