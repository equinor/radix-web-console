import { isArrayOfStrings } from './type-guards'

describe('isArrayOfStrings', () => {
  it('returns true for an empty array', () => {
    expect(isArrayOfStrings([])).toBe(true)
  })

  it('returns true for an array of only strings', () => {
    expect(isArrayOfStrings(['a', 'b', 'c'])).toBe(true)
  })

  it('returns false for an array with a non-string item', () => {
    expect(isArrayOfStrings(['a', 1, 'c'])).toBe(false)
  })

  it('returns false for a non-array value', () => {
    expect(isArrayOfStrings('not an array')).toBe(false)
  })

  it('returns false for null', () => {
    expect(isArrayOfStrings(null)).toBe(false)
  })

  it('returns false for undefined', () => {
    expect(isArrayOfStrings(undefined)).toBe(false)
  })

  it('returns false for an array of objects', () => {
    expect(isArrayOfStrings([{ name: 'a' }])).toBe(false)
  })
})
