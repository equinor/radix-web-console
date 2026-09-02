import { smallReplicaName, smallScheduledBatchName, smallScheduledJobName } from '../../../../../utils/string'

export function consumerSecretName(replicaName: string, batchName?: string, jobName?: string): string {
  if (batchName && batchName.length > 0) {
    // show only first secret-version entry for pods of this batch
    return `batch: ${smallScheduledBatchName(batchName)}`
  }
  if (jobName && jobName.length > 0) {
    return `job: ${smallScheduledJobName(jobName)}`
  }
  if (replicaName.toLowerCase() === 'new jobs') {
    return 'New job'
  }
  return `replica: ${smallReplicaName(replicaName)}`
}
