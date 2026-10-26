import { Icon, Tooltip, Typography } from '@equinor/eds-core-react'
import { key, verified_user } from '@equinor/eds-icons'
import type { KeyVaultAuthMethod, KeyVaultSecrets } from '../../../../../domain/key-vault/keyVault.types'
import { getKeyVaultAuthMethod } from '../../../../../domain/key-vault/keyVault.utils'
import styles from './keyVaultAuthMethodBadge.module.css'

const AUTH_METHOD_PRESENTATION = {
  'workload-identity': {
    label: 'Workload identity',
    description: "Authenticates with the component's Workload Identity.",
    icon: verified_user,
  },
  'client-credentials': {
    label: 'Client credentials',
    description: 'Authenticates with a Client ID and Client Secret stored as credentials.',
    icon: key,
  },
} as const satisfies Record<KeyVaultAuthMethod, { label: string; icon: typeof key; description: string }>

interface KeyVaultAuthMethodBadgeProps {
  vaultSecrets: KeyVaultSecrets
}

export const KeyVaultAuthMethodBadge = (props: KeyVaultAuthMethodBadgeProps) => {
  const { vaultSecrets } = props

  const authMethod = getKeyVaultAuthMethod(vaultSecrets)
  const meta = AUTH_METHOD_PRESENTATION[authMethod]

  return (
    <Tooltip title={meta.description} placement="top">
      <span className={styles.badge}>
        <Icon data={meta.icon} size={16} />
        <Typography as="span" variant="caption">
          {meta.label}
        </Typography>
      </span>
    </Tooltip>
  )
}
