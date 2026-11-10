import type { JobSummary } from '../../store/radix-api'
import type { ApplyConfigPromptStatus } from './applyConfigPrompt.types'

/**
 * What a job status means for the onboarding prompt specifically. A stopped job is shown as failed
 * because, for the user, the outcome is the same.
 */
const JOB_STATUS_TO_PROMPT_STATUS: Readonly<Record<NonNullable<JobSummary['status']>, ApplyConfigPromptStatus>> = {
  Queued: 'in-progress',
  Waiting: 'in-progress',
  Running: 'in-progress',
  Stopping: 'in-progress',
  Failed: 'failed',
  Stopped: 'failed',
  StoppedNoChanges: 'failed',
  Succeeded: 'not-started',
}

/** Decides what the prompt should say based on the most recent pipeline job. Only meaningful while the config is not applied. */
export const getApplyConfigPromptStatus = (latestJob?: JobSummary): ApplyConfigPromptStatus => {
  if (!latestJob?.status) return 'not-started'
  return JOB_STATUS_TO_PROMPT_STATUS[latestJob.status] ?? 'not-started'
}
