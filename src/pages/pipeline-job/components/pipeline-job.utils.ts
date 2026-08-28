import type { Job } from '../../../store/radix-api'

// Statuses where the job can still be stopped, mapped to the action label.
const STOP_ACTION_LABEL: Partial<Record<NonNullable<Job['status']>, string>> = {
  Queued: 'Cancel',
  Waiting: 'Cancel',
  Running: 'Stop',
  Stopping: 'Stop',
}

export const canStopJob = (status: Job['status']): boolean => status != null && status in STOP_ACTION_LABEL

export const getStopButtonText = (status: Job['status']): string | undefined =>
  status ? STOP_ACTION_LABEL[status] : undefined

export const getBuildCacheStatus = (job: Job): string => {
  const statuses: string[] = []

  if (job.refreshBuildCache === true) {
    statuses.push('refreshed')
  }
  if (typeof job.overrideUseBuildCache === 'boolean') {
    statuses.push(job.overrideUseBuildCache === true ? 'used' : 'not used')
  } else {
    statuses.push(typeof job.useBuildCache !== 'boolean' || job.useBuildCache === true ? 'used' : 'not used')
  }
  return statuses.join(', ')
}
