import { error_outlined, warning_outlined } from '@equinor/eds-icons'
import type { KeyVaultIssue } from './keyVaultSecretsTable.types'

export const KEY_VAULT_ISSUE_PRESENTATION = {
  'missing-credentials': {
    title: 'Credentials missing',
    severity: 'danger',
    icon: error_outlined,
    triggerLabel: 'Key Vault credentials missing',
  },
  'no-items-available': {
    title: 'No Key Vault Items available',
    severity: 'warning',
    icon: warning_outlined,
    triggerLabel: 'No Key Vault Items available',
  },
} as const satisfies Record<KeyVaultIssue['kind'], unknown>
