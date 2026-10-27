import { describe, expect, it } from 'vitest'
import type { Application, EnvironmentSummary } from '../../store/radix-api'
import { hasAppliedRadixConfig } from './radixConfig.utils'

const mockApplication = (environments?: EnvironmentSummary[]): Pick<Application, 'environments'> => ({ environments })

describe('hasAppliedRadixConfig', () => {
  it('is false when environments is undefined', () => {
    expect(hasAppliedRadixConfig(mockApplication(undefined))).toBe(false)
  })

  it('is false when there are no environments', () => {
    expect(hasAppliedRadixConfig(mockApplication([]))).toBe(false)
  })

  it('is true when the application has at least one environment', () => {
    expect(hasAppliedRadixConfig(mockApplication([{ name: 'dev' } as EnvironmentSummary]))).toBe(true)
  })
})
