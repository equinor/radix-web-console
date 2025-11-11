import { Table, Typography } from '@equinor/eds-core-react'
import type { FunctionComponent } from 'react'
import { useGetConfigurationQuery } from '../../store/radix-api'
import AsyncResource from '../async-resource/async-resource'

const ConfigVariableTableCell: FunctionComponent<{
  value: string[] | unknown
}> = ({ value }) => (
  <Table.Cell>
    <pre>
      <div style={{ userSelect: 'all' }}>
        <Typography>{Array.isArray(value) ? value.join('\n') : JSON.stringify(value, null, 2)}</Typography>
      </div>
    </pre>
  </Table.Cell>
)

export const ConfigList: FunctionComponent = () => {
  const { data: config, ...state } = useGetConfigurationQuery()

  const configItems = [
    { label: 'Cluster egress IPs', value: config?.clusterEgressIps },
    { label: 'Cluster OIDC issuer URLs', value: config?.clusterOidcIssuers },
    { label: 'Cluster base', value: config?.dnsZone },
  ]

  return (
    <AsyncResource asyncState={state}>
      <div className="grid grid--auto-columns">
        <Table className="o-table">
          <Table.Body>
            {configItems
              .sort((a, b) => a.label.localeCompare(b.label))
              .map(({ label, value }) => (
                <Table.Row key={label}>
                  <Table.Cell>
                    <Typography>{label}</Typography>
                  </Table.Cell>
                  <ConfigVariableTableCell value={value} />
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </AsyncResource>
  )
}
