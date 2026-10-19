import { describe, expect, it } from 'vitest'
import { toValueList } from './configList.utils'

describe('toValueList', () => {
  it('returns an empty list for undefined', () => {
    expect(toValueList(undefined)).toEqual([])
  })

  it('wraps a single string in a list', () => {
    expect(toValueList('dev.radix.equinor.com')).toEqual(['dev.radix.equinor.com'])
  })

  it('returns an array value unchanged', () => {
    expect(toValueList(['10.0.0.1', '10.0.0.2'])).toEqual(['10.0.0.1', '10.0.0.2'])
  })

  it('returns an empty list for an empty array', () => {
    expect(toValueList([])).toEqual([])
  })
})
