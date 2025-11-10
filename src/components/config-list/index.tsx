import { Table, Typography } from '@equinor/eds-core-react'
import type { FunctionComponent } from 'react'
import { useGetConfigurationQuery } from '../../store/radix-api'

const ConfigVariableTableCell: FunctionComponent<{
  value: string[] | unknown
}> = ({ value }) => (
  <Table.Cell>
    <pre>
      <Typography>{Array.isArray(value) ? value.join('\n') : JSON.stringify(value, null, 2)}</Typography>
    </pre>
  </Table.Cell>
)

export const ConfigList: FunctionComponent = () => {
  const { data: config } = useGetConfigurationQuery(undefined, { pollingInterval: 10000 })

  const configItems = [
    { label: 'Cluster egress IPs', value: config?.clusterEgressIps },
    { label: 'Cluster OIDC issuer URL', value: config?.clusterOidcIssuers },
    { label: 'Cluster base', value: config?.dnsZone },
  ]

  return (
    <div className="grid grid--auto-columns">
      <Table className="o-table">

        <Table.Body>
          {configItems
            .sort((a, b) => a.label.localeCompare(b.label))
            .map(({label,value}) => (
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
  )
}
