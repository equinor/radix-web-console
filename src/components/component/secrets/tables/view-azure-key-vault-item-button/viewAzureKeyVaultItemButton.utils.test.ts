import { describe, expect, it } from 'vitest'
import type { AzureKeyVaultSecretVersion } from '../../../../../store/radix-api'
import { extractKey, formatVaultItem, removeDuplicateBatchVaultItems } from './viewAzureKeyVaultItemButton.utils'

const baseItem: AzureKeyVaultSecretVersion = {
  version: 'v1',
  replicaCreated: '',
  replicaName: '',
}

describe('formatVaultItem', () => {
  it('formats a batch consumer with the short batch name and batchCreated', () => {
    const result = formatVaultItem({
      ...baseItem,
      batchName: 'batch-20261012032400-abcde',
      batchCreated: 'Oct 12, 2026 03:24:00',
    })

    expect(result).toEqual({
      version: 'v1',
      consumer: 'batch: abcde',
      consumerCreated: 'Oct 12, 2026 03:24:00',
    })
  })

  it('prefers the batch consumer over a job when both are present', () => {
    const result = formatVaultItem({
      ...baseItem,
      batchName: 'batch-20261012032400-abcde',
      batchCreated: 'batch-created',
      jobName: 'job-20261012032400-fghij',
      jobCreated: 'job-created',
    })

    expect(result.consumer).toBe('batch: abcde')
    expect(result.consumerCreated).toBe('batch-created')
  })

  it('formats a job consumer with the short job name and jobCreated', () => {
    const result = formatVaultItem({
      ...baseItem,
      jobName: 'job-20261012032400-fghij',
      jobCreated: 'Oct 12, 2026 03:24:00',
    })

    expect(result).toEqual({
      version: 'v1',
      consumer: 'job: fghij',
      consumerCreated: 'Oct 12, 2026 03:24:00',
    })
  })

  it('prefers the job consumer over a replica when both are present', () => {
    const result = formatVaultItem({
      ...baseItem,
      jobName: 'job-20261012032400-fghij',
      jobCreated: 'job-created',
      replicaName: 'my-component-7d9f8b6c5d-klmno',
      replicaCreated: 'replica-created',
    })

    expect(result.consumer).toBe('job: fghij')
    expect(result.consumerCreated).toBe('job-created')
  })

  it('formats a replica consumer with the short replica name and replicaCreated', () => {
    const result = formatVaultItem({
      ...baseItem,
      replicaName: 'my-component-7d9f8b6c5d-klmno',
      replicaCreated: 'Oct 11, 2026 03:24:00',
    })

    expect(result).toEqual({
      version: 'v1',
      consumer: 'replica: klmno',
      consumerCreated: 'Oct 11, 2026 03:24:00',
    })
  })

  it('labels a "new jobs" replica as a "New job" consumer', () => {
    const result = formatVaultItem({
      ...baseItem,
      replicaName: 'New jobs',
      replicaCreated: 'Oct 11, 2026 03:24:00',
    })

    expect(result.consumer).toBe('New job')
  })

  it('matches the "new jobs" replica case-insensitively', () => {
    const result = formatVaultItem({
      ...baseItem,
      replicaName: 'NEW JOBS',
      replicaCreated: 'Oct 11, 2026 03:24:00',
    })

    expect(result.consumer).toBe('New job')
  })

  it('omits the consumerCreated for a "new jobs" replica', () => {
    const result = formatVaultItem({
      ...baseItem,
      replicaName: 'new jobs',
      replicaCreated: 'Oct 11, 2026 03:24:00',
    })

    expect(result.consumerCreated).toBeUndefined()
  })

  it('returns an empty consumer when no batch, job or replica is set', () => {
    const result = formatVaultItem(baseItem)

    expect(result).toEqual({
      version: 'v1',
      consumer: '',
      consumerCreated: undefined,
    })
  })
})

describe('extractKey', () => {
  it('maps the "cert" prefix to a "Certificate" key type', () => {
    expect(extractKey('cert/my-secret')).toEqual({
      keyType: 'Certificate',
      key: 'my-secret',
    })
  })

  it('maps the "key" prefix to a "Key" key type', () => {
    expect(extractKey('key/my-secret').keyType).toBe('Key')
  })

  it('maps the "secret" prefix to a "Secret" key type', () => {
    expect(extractKey('secret/my-secret').keyType).toBe('Secret')
  })

  it('matches the key type prefix case-insensitively', () => {
    expect(extractKey('CERT/my-secret').keyType).toBe('Certificate')
  })

  it('keeps an unknown key type prefix as-is', () => {
    expect(extractKey('custom/my-secret').keyType).toBe('custom')
  })

  it('preserves remaining slashes when joining the key', () => {
    expect(extractKey('secret/nested/path/value').key).toBe('nested/path/value')
  })

  it('returns an empty key type and key for an undefined secret id', () => {
    expect(extractKey(undefined)).toEqual({ keyType: '', key: '' })
  })

  it('returns an empty key when the secret id has no slash', () => {
    expect(extractKey('secret')).toEqual({ keyType: 'Secret', key: '' })
  })
})

describe('removeDuplicateBatchVaultItems', () => {
  it('returns an empty array for undefined data', () => {
    expect(removeDuplicateBatchVaultItems(undefined)).toEqual([])
  })

  it('returns an empty array for an empty list', () => {
    expect(removeDuplicateBatchVaultItems([])).toEqual([])
  })

  it('keeps only the first item of a duplicated batchName and version pair', () => {
    const first: AzureKeyVaultSecretVersion = {
      ...baseItem,
      version: 'v1',
      batchName: 'batch-a',
    }
    const duplicate: AzureKeyVaultSecretVersion = {
      ...baseItem,
      version: 'v1',
      batchName: 'batch-a',
    }

    expect(removeDuplicateBatchVaultItems([first, duplicate])).toEqual([first])
  })

  it('keeps batch items that share a batchName but differ in version', () => {
    const items: AzureKeyVaultSecretVersion[] = [
      { ...baseItem, version: 'v1', batchName: 'batch-a' },
      { ...baseItem, version: 'v2', batchName: 'batch-a' },
    ]

    expect(removeDuplicateBatchVaultItems(items)).toEqual(items)
  })

  it('keeps batch items that share a version but differ in batchName', () => {
    const items: AzureKeyVaultSecretVersion[] = [
      { ...baseItem, version: 'v1', batchName: 'batch-a' },
      { ...baseItem, version: 'v1', batchName: 'batch-b' },
    ]

    expect(removeDuplicateBatchVaultItems(items)).toEqual(items)
  })

  it('never removes non-batch items even when their version matches a batch item', () => {
    const items: AzureKeyVaultSecretVersion[] = [
      { ...baseItem, version: 'v1', batchName: 'batch-a' },
      { ...baseItem, version: 'v1', jobName: 'job-a' },
      { ...baseItem, version: 'v1', replicaName: 'replica-a' },
    ]

    expect(removeDuplicateBatchVaultItems(items)).toEqual(items)
  })

  it('does not deduplicate non-batch items that share a version', () => {
    const items: AzureKeyVaultSecretVersion[] = [
      { ...baseItem, version: 'v1', replicaName: 'replica-a' },
      { ...baseItem, version: 'v1', replicaName: 'replica-b' },
    ]

    expect(removeDuplicateBatchVaultItems(items)).toEqual(items)
  })

  it('preserves the original order of the kept items', () => {
    const items: AzureKeyVaultSecretVersion[] = [
      { ...baseItem, version: 'v1', batchName: 'batch-a' },
      { ...baseItem, version: 'v1', jobName: 'job-a' },
      { ...baseItem, version: 'v1', batchName: 'batch-a' },
      { ...baseItem, version: 'v2', batchName: 'batch-a' },
    ]

    expect(removeDuplicateBatchVaultItems(items)).toEqual([
      { ...baseItem, version: 'v1', batchName: 'batch-a' },
      { ...baseItem, version: 'v1', jobName: 'job-a' },
      { ...baseItem, version: 'v2', batchName: 'batch-a' },
    ])
  })
})
