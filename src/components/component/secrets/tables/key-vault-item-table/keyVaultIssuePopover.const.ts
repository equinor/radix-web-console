import type { IconData } from '@equinor/eds-icons'
import { error_outlined, warning_outlined } from '@equinor/eds-icons'
import type { KeyVaultIssue } from './keyVaultSecretsTable.types'

interface KeyVaultIssuePresentation {
  readonly title: string
  readonly severity: 'danger' | 'warning'
  readonly icon: IconData
  readonly triggerLabel: string
}

export const KEY_VAULT_ISSUE_PRESENTATION = {
  'missing-credentials': {
    title: 'Credentials missing',
    severity: 'danger',
    icon: error_outlined,
    triggerLabel: 'Key Vault credentials missing',
  },
  'some-items-unavailable': {
    title: 'Key Vault Items unavailable',
    severity: 'warning',
    icon: warning_outlined,
    triggerLabel: 'Some Key Vault Items unavailable',
  },
} as const satisfies Record<KeyVaultIssue['kind'], KeyVaultIssuePresentation>
