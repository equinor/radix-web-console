import type { AzureKeyVaultSecretVersion } from '../../../../../store/radix-api'

/**
 * Formats a vault item into a standardized structure with version, consumer, and consumerCreated fields.
 */
export const formatVaultItem = (
  item: AzureKeyVaultSecretVersion
): { version: string; consumer: string; consumerCreated: string | undefined } => {
  if (item.batchName) {
    return {
      version: item.version,
      consumer: `batch: ${item.batchName}`,
      consumerCreated: item.batchCreated,
    }
  }
  if (item.jobName) {
    return {
      version: item.version,
      consumer: `job: ${item.jobName}`,
      consumerCreated: item.jobCreated,
    }
  }
  if (item.replicaName) {
    const isNewReplicaJob = item.replicaName.toLowerCase() === 'new jobs'

    return {
      version: item.version,
      consumer: isNewReplicaJob ? 'New job' : `replica: ${item.replicaName}`,
      consumerCreated: isNewReplicaJob ? undefined : item.replicaCreated,
    }
  }

  return {
    version: item.version,
    consumer: '',
    consumerCreated: '',
  }
}

/**
 * Removes duplicate secrets for job pods that share the same batchName and version,
 * keeping only the first occurrence of each batch/version pair. Non-batch items are always kept.
 */
export const removeDuplicateBatchVaultItems = (data?: AzureKeyVaultSecretVersion[]): AzureKeyVaultSecretVersion[] =>
  (data ?? []).filter(
    (item, index, items) =>
      !item.batchName ||
      items.findIndex((other) => other.batchName === item.batchName && other.version === item.version) === index
  )

/**
 * Filters and returns a list of vault items, avoids showing duplicate secrets for job pods with same batchName and version
 */
export const filterVaultItems = (_data?: AzureKeyVaultSecretVersion[]): AzureKeyVaultSecretVersion[] => {
  // Temporary mock data for UI development; swap to removeDuplicateBatchVaultItems(data) when ready
  return [
    {
      version: 'tx4vpiye50',
      batchName: 'abcde',
      batchCreated: 'Oct 12, 2026 03:24:00',
      jobName: '',
      replicaCreated: '',
      replicaName: '',
    },
    {
      version: 'tx4vpiye50',
      batchCreated: 'Oct 12, 2026 03:24:00',
      jobName: 'fghij',
      jobCreated: 'Oct 12, 2026 03:24:00',
      replicaCreated: '',
      replicaName: '',
    },
    {
      version: 'efb4czvti0',
      replicaName: 'm4al',
      batchName: '',
      jobName: '',
      replicaCreated: 'Oct 11, 2026 03:24:00',
    },
  ]
}

/**
 * Formats the key type into a human-readable string.
 */
const formatKeyType = (keyType: string) => {
  switch (keyType.toLowerCase()) {
    case 'cert':
      return 'Certificate'
    case 'key':
      return 'Key'
    case 'secret':
      return 'Secret'
    default:
      return keyType
  }
}

/**
 * Extracts the key type and key from a secret ID.
 */
export const extractKey = (secretId?: string): { keyType: string; key: string } => {
  const shortKeyType = secretId?.split('/')[0] ?? ''
  const key = secretId?.split('/').slice(1).join('/') ?? ''

  return { keyType: formatKeyType(shortKeyType), key }
}
