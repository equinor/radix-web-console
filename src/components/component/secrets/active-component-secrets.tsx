import { Accordion, Typography } from '@equinor/eds-core-react'
import { type FunctionComponent, useEffect, useState } from 'react'
import { pollingInterval } from '../../../store/defaults'
import { type Secret, useGetEnvironmentQuery } from '../../../store/radix-api'
import AsyncResource from '../../async-resource/async-resource'
import { GenericSecrets, KeyVaultSecrets, type SecretComponent, VolumeMountSecrets } from './secret-tables'

type SecretTable = { title: string; Component: SecretComponent }
type SecretTableGroup = SecretTable & { types: Array<Secret['type']> }
type SecretTableItem = SecretTable & { secrets: Array<Secret> }

const secretGrouping = Object.freeze<Array<SecretTableGroup>>([
  {
    title: 'Secrets',
    Component: GenericSecrets,
    types: ['generic'],
  },
  {
    title: 'TLS Client Certificate',
    Component: GenericSecrets,
    types: ['client-cert-auth'],
  },
  {
    title: 'Volume Mounts',
    Component: VolumeMountSecrets,
    types: ['csi-azure-blob-volume', 'azure-blob-fuse-volume'],
  },
  {
    title: 'Key Vaults',
    Component: KeyVaultSecrets,
    types: ['csi-azure-key-vault-creds', 'csi-azure-key-vault-item'],
  },
  {
    title: 'OAuth2',
    Component: GenericSecrets,
    types: ['oauth2-proxy'],
  },
])

function groupSecrets(secrets: Array<Secret>, groups: Readonly<Array<SecretTableGroup>>): Array<SecretTableItem> {
  const groupTypes = groups.flatMap(({ types }) => types)
  const grouped = groups
    .map<SecretTableItem>(({ types, ...rest }) => ({
      secrets: secrets.filter(({ type }) => types.includes(type)),
      ...rest,
    }))
    .filter(({ secrets }) => secrets.length > 0)

  // add any non-grouped secrets to an ungrouped list
  const uncategorized = secrets.filter((x) => !groupTypes.includes(x.type))
  if (uncategorized.length > 0) {
    grouped.push({
      title: 'Uncategorized',
      Component: GenericSecrets,
      secrets: uncategorized,
    })
  }

  return grouped
}

export const ActiveComponentSecrets: FunctionComponent<{
  appName: string
  envName: string
  componentName: string
  secretNames?: Array<string>
}> = ({ appName, envName, componentName, secretNames }) => {
  const { data: environment, ...environmentState } = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval }
  )

  const [secretTables, setSecretTables] = useState<Array<SecretTableItem>>([])
  useEffect(() => {
    const componentSecrets = [
      ...(secretNames || [])
        .map(
          (name) =>
            environment?.activeDeployment &&
            environment.secrets?.find((x) => x.name === name && x.component === componentName)
        )
        .filter((x) => !!x),
    ]

    setSecretTables(groupSecrets(componentSecrets, secretGrouping))
  }, [secretNames, componentName, environment])

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={secretTables.length > 0}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              Secrets ({secretTables.reduce((sum, { secrets }) => sum + (secrets?.length ?? 0), 0)})
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource asyncState={environmentState}>
            {secretTables.length > 0 ? (
              <div className="grid grid--gap-medium">
                {secretTables.map(({ Component, title, secrets }, i) => (
                  <Accordion key={i} chevronPosition="right">
                    <Accordion.Item isExpanded={secrets.some((x) => x.status !== 'Consistent')}>
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
