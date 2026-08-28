import { Typography } from '@equinor/eds-core-react'
import AsyncResource from '../../../../components/async-resource/async-resource'
import { CompactCopyButton } from '../../../../components/compact-copy-button'
import { useGetConfigurationQuery } from '../../../../store/radix-api'
import styles from './configList.module.css'
import type { ConfigItem, ConfigValue } from './configList.types'
import { toValueList } from './configList.utils'

const ConfigValueList = (props: { value: ConfigValue }) => {
  const { value } = props

  const valueAsList = toValueList(value)

  return (
    <>
      {valueAsList.map((configValue) => (
        <div key={configValue} className={styles.valueRow}>
          <Typography className={styles.value}>{configValue}</Typography>
          <CompactCopyButton content={configValue} size={14} />
        </div>
      ))}
    </>
  )
}

export const ConfigList = () => {
  const { data: config, ...state } = useGetConfigurationQuery()

  const configItems: ReadonlyArray<ConfigItem> = [
    { label: 'DNS Zone', value: config?.dnsZone },
    { label: 'Egress IPs', value: config?.clusterEgressIps },
    { label: 'OIDC Issuer URLs', value: config?.clusterOidcIssuers },
  ]

  return (
    <AsyncResource asyncState={state}>
      <dl className={styles.configList}>
        {configItems.map(({ label, value }) => (
          <div className={styles.row} key={label}>
            <dt>
              <Typography bold>{label}</Typography>
            </dt>
            <dd className={styles.definition}>
              <ConfigValueList value={value} />
            </dd>
          </div>
        ))}
      </dl>
    </AsyncResource>
  )
}
