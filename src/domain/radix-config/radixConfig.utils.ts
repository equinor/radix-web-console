import type { Application } from '../../store/radix-api'

/**
 * Whether Radix has applied the application's radixconfig.yaml yet. Environments are
 * derived from the config by the apply-config pipeline, so an application with no
 * environments means the config has not been applied.
 */
export const hasAppliedRadixConfig = (application: Pick<Application, 'environments'>): boolean =>
  (application.environments?.length ?? 0) > 0
