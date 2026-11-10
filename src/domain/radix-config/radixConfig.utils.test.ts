import { describe, expect, it } from 'vitest'
import type { Application, EnvironmentSummary } from '../../store/radix-api'
import { getConfigFileName, hasAppliedRadixConfig } from './radixConfig.utils'

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

describe('getConfigFileName', () => {
  it('falls back to radixconfig.yaml when the file name is missing', () => {
    expect(getConfigFileName(undefined)).toBe('radixconfig.yaml')
  })

  it('returns the configured file path', () => {
    expect(getConfigFileName('config/radixconfig.yaml')).toBe('config/radixconfig.yaml')
  })
})
