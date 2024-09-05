import { extractCweNumber } from './cwe'

describe('extractCweNumber', () => {
  it('extracts CWE id from an uppercase argument', () => {
    expect(extractCweNumber('CWE-123')).toEqual('123')
  })

  it('extracts CWE id from a lowercase argument', () => {
    expect(extractCweNumber('cwe-123')).toEqual('123')
  })

  it("returns argument value when value is not prefixed with 'cwe'", () => {
    expect(extractCweNumber('abc-123')).toEqual('abc-123')
  })

  it('returns argument value when cwe part is not numeric', () => {
    expect(extractCweNumber('CWE-12x')).toEqual('CWE-12x')
  })

  it('returns argument value when when value has a suffic', () => {
    expect(extractCweNumber('CWE-123-abc')).toEqual('CWE-123-abc')
  })
})
