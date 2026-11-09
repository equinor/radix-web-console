import { describe, expect, it } from 'vitest'
import type { Secret } from '../../../../../store/radix-api'
import { buildKeyVaultTableGroups, getKeyVaultIssue } from './keyVaultSecretsTable.utils'

const secret = (type: Secret['type'], status?: Secret['status'], resource = 'vault'): Secret => ({
  name: `${type}-${status ?? ''}`,
  type,
  status,
  resource,
})

describe('buildKeyVaultTableGroups', () => {
  it('groups credentials and items belonging to the same vault together', () => {
    const groups = buildKeyVaultTableGroups([
      secret('csi-azure-key-vault-creds', 'Consistent'),
      secret('csi-azure-key-vault-item', 'Consistent'),
    ])
    expect(groups).toHaveLength(1)
    expect(groups[0].secrets).toHaveLength(2)
  })

  it('attaches the derived issue to each vault group', () => {
    const groups = buildKeyVaultTableGroups([
      secret('csi-azure-key-vault-item', 'Consistent', 'healthy'),
      secret('csi-azure-key-vault-item', 'Pending', 'broken'),
    ])
    expect(groups.map((group) => [group.vaultName, group.issue])).toEqual([
      ['broken', { kind: 'some-items-unavailable' }],
      ['healthy', undefined],
    ])
  })

  it('orders vault groups alphabetically by vault name', () => {
    const groups = buildKeyVaultTableGroups([
      secret('csi-azure-key-vault-item', 'Consistent', 'zeta-vault'),
      secret('csi-azure-key-vault-item', 'Consistent', 'alpha-vault'),
      secret('csi-azure-key-vault-item', 'Consistent', 'mid-vault'),
    ])
    expect(groups.map((group) => group.vaultName)).toEqual(['alpha-vault', 'mid-vault', 'zeta-vault'])
  })

  it('lists credentials before items within a vault regardless of input order', () => {
    const item: Secret = { name: 'a-item', type: 'csi-azure-key-vault-item', resource: 'vault' }
    const credential: Secret = { name: 'z-cred', type: 'csi-azure-key-vault-creds', resource: 'vault' }

    const [group] = buildKeyVaultTableGroups([item, credential])
    expect(group.secrets.map((vaultSecret) => vaultSecret.type)).toEqual([
      'csi-azure-key-vault-creds',
      'csi-azure-key-vault-item',
    ])
  })

  it('sorts secrets within a vault by display name, falling back to name', () => {
    const named: Secret = { name: 'b-item', type: 'csi-azure-key-vault-item', resource: 'vault' }
    const displayNamed: Secret = {
      name: 'z-item',
      displayName: 'a-display',
      type: 'csi-azure-key-vault-item',
      resource: 'vault',
    }
    const last: Secret = { name: 'c-item', type: 'csi-azure-key-vault-item', resource: 'vault' }

    const [group] = buildKeyVaultTableGroups([last, named, displayNamed])
    expect(group.secrets.map((vaultSecret) => vaultSecret.name)).toEqual(['z-item', 'b-item', 'c-item'])
  })
})

describe('getKeyVaultIssue', () => {
  it('reports missing-credentials with only the credentials that are not Consistent', () => {
    const broken = secret('csi-azure-key-vault-creds', 'Pending')
    expect(getKeyVaultIssue([broken, secret('csi-azure-key-vault-creds', 'Consistent')])).toEqual({
      kind: 'missing-credentials',
      inconsistentCredentials: [broken],
    })
  })

  it('prefers missing-credentials over some-items-unavailable when both apply', () => {
    expect(
      getKeyVaultIssue([secret('csi-azure-key-vault-creds', 'Pending'), secret('csi-azure-key-vault-item', 'Pending')])
    ).toMatchObject({ kind: 'missing-credentials' })
  })

  it('reports some-items-unavailable when credentials are consistent but an item is not', () => {
    expect(
      getKeyVaultIssue([
        secret('csi-azure-key-vault-creds', 'Consistent'),
        secret('csi-azure-key-vault-item', 'Pending'),
      ])
    ).toEqual({ kind: 'some-items-unavailable' })
  })

  it('reports some-items-unavailable for a vault without credentials whose item is unavailable', () => {
    expect(getKeyVaultIssue([secret('csi-azure-key-vault-item', 'Pending')])).toEqual({
      kind: 'some-items-unavailable',
    })
  })

  it('reports some-items-unavailable when only one of several items is unavailable', () => {
    expect(
      getKeyVaultIssue([
        secret('csi-azure-key-vault-creds', 'Consistent'),
        secret('csi-azure-key-vault-item', 'Pending'),
        secret('csi-azure-key-vault-item', 'Consistent'),
      ])
    ).toEqual({ kind: 'some-items-unavailable' })
  })

  it('reports no issue when all items are consistent', () => {
    expect(
      getKeyVaultIssue([
        secret('csi-azure-key-vault-creds', 'Consistent'),
        secret('csi-azure-key-vault-item', 'Consistent'),
        secret('csi-azure-key-vault-item', 'Consistent'),
      ])
    ).toBeUndefined()
  })

  it('reports no issue when the vault has consistent credentials and no items', () => {
    expect(getKeyVaultIssue([secret('csi-azure-key-vault-creds', 'Consistent')])).toBeUndefined()
  })
})
