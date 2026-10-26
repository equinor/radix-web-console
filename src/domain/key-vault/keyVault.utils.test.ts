import { describe, expect, it } from 'vitest'
import type { Secret } from '../../store/radix-api'
import { getKeyVaultAuthMethod, usesClientCredentials } from './keyVault.utils'

const secret = (type: Secret['type']): Secret => ({ name: type ?? 'secret', type })

describe('usesClientCredentials', () => {
  it('is true when the vault has a credentials secret', () => {
    expect(usesClientCredentials([secret('csi-azure-key-vault-creds'), secret('csi-azure-key-vault-item')])).toBe(true)
  })

  it('is false when the vault has only items', () => {
    expect(usesClientCredentials([secret('csi-azure-key-vault-item')])).toBe(false)
  })
})

describe('getKeyVaultAuthMethod', () => {
  it('resolves to client-credentials when a credentials secret is present', () => {
    expect(getKeyVaultAuthMethod([secret('csi-azure-key-vault-creds')])).toBe('client-credentials')
  })

  it('resolves to workload-identity when no credentials secret is present', () => {
    expect(getKeyVaultAuthMethod([secret('csi-azure-key-vault-item')])).toBe('workload-identity')
  })
})
