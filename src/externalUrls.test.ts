import { externalUrls } from './externalUrls'

describe('externalUrls', () => {
  it('returns an url with information about the CVE identifier specified in argument', () => {
    expect(externalUrls.cveVulnerabilityInformation('CVE-2021-33574')).toEqual(
      'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-33574'
    )
  })
  it('returns an url with information about the CWE identifier specified in argument', () => {
    expect(externalUrls.cweVulnerabilityInformation('CWE-123')).toEqual(
      'https://cwe.mitre.org/data/definitions/123.html'
    )
  })
})
