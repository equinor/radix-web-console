import { Accordion, Typography } from '@equinor/eds-core-react'
import { useMemo } from 'react'
import { pollingInterval } from '../../../store/defaults'
import { useGetEnvironmentQuery } from '../../../store/radix-api'
import AsyncResource from '../../async-resource/async-resource'
import { SECRET_GROUPING } from './activeComponentSecrets.const'
import { groupSecrets } from './activeComponentSecrets.utils'

interface ActiveComponentSecretsProps {
  readonly appName: string
  readonly envName: string
  readonly componentName: string
  readonly secretNames?: ReadonlyArray<string>
}

export const ActiveComponentSecrets = (props: ActiveComponentSecretsProps) => {
  const { appName, envName, componentName, secretNames } = props

  const { data: environment, ...environmentState } = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval }
  )

  const secretTables = useMemo(() => {
    const componentSecrets = (secretNames ?? [])
      .map(
        (name) =>
          environment?.activeDeployment &&
          environment.secrets?.find((secret) => secret.name === name && secret.component === componentName)
      )
      .filter((secret) => !!secret)

    return groupSecrets(componentSecrets, SECRET_GROUPING)
  }, [secretNames, componentName, environment])

  const totalSecretCount = secretTables.reduce((sum, { secrets }) => sum + (secrets?.length ?? 0), 0)

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={secretTables.length > 0}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              Secrets ({totalSecretCount})
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource asyncState={environmentState}>
            {secretTables.length > 0 ? (
              <div className="grid grid--gap-medium">
                {secretTables.map(({ Component, title, secrets }) => (
                  <Accordion key={title} chevronPosition="right">
                    <Accordion.Item isExpanded={secrets.some((secret) => secret.status !== 'Consistent')}>
                      <Accordion.Header>
                        <Accordion.HeaderTitle>
                          <Typography className="whitespace-nowrap" variant="h5" token={{ fontWeight: 400 }}>
                            {title || 'Secrets'} ({secrets.length})
                          </Typography>
                        </Accordion.HeaderTitle>
                      </Accordion.Header>

                      <Accordion.Panel>
                        <div className="grid">
                          <Component {...{ appName, envName, componentName, secrets }} />
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                ))}
              </div>
            ) : (
              <Typography>This component has no secrets</Typography>
            )}
          </AsyncResource>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
