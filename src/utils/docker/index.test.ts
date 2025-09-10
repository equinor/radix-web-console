import { parseImageDigest, parseImageTag } from '.'

describe('parseContainerImageDigest', () => {
  it('parses an image with registry+path and digest', () => {
    expect(
      parseImageDigest(
        'radixdev.azurecr.io/radix-job-demo-server@sha256:d40cda01916ef63da3607c03785efabc56eb2fc2e0dab0726b1a843e9ded093f'
      )
    ).toEqual({
      repository: 'radix-job-demo-server',
      image: 'radix-job-demo-server@sha256:d40cda01916ef63da3607c03785efabc56eb2fc2e0dab0726b1a843e9ded093f',
      digest: 'sha256:d40cda01916ef63da3607c03785efabc56eb2fc2e0dab0726b1a843e9ded093f',
    })
  })

  it('parses an image with digest', () => {
    expect(
      parseImageDigest('radix-job-demo-server@sha256:d40cda01916ef63da3607c03785efabc56eb2fc2e0dab0726b1a843e9ded093f')
    ).toEqual({
      repository: 'radix-job-demo-server',
      image: 'radix-job-demo-server@sha256:d40cda01916ef63da3607c03785efabc56eb2fc2e0dab0726b1a843e9ded093f',
      digest: 'sha256:d40cda01916ef63da3607c03785efabc56eb2fc2e0dab0726b1a843e9ded093f',
    })
  })

  it('returns empty object when image does not contain digest', () => {
    expect(parseImageDigest('radix-job-demo-server')).toEqual({})
  })
})

describe('parseImageTag', () => {
  it('parses an image with registry+path and tag', () => {
    expect(parseImageTag('radixdev.azurecr.io/radix-job-demo-server:248o5')).toEqual({
      repository: 'radix-job-demo-server',
      image: 'radix-job-demo-server:248o5',
      tag: '248o5',
    })
  })

  it('parses an image with tag', () => {
    expect(parseImageTag('radix-job-demo-server:248o5')).toEqual({
      repository: 'radix-job-demo-server',
      image: 'radix-job-demo-server:248o5',
      tag: '248o5',
    })
  })

  it('returns repository when image does not contain tag', () => {
    expect(parseImageTag('radix-job-demo-server')).toEqual({
      repository: 'radix-job-demo-server',
      image: 'radix-job-demo-server',
    })
  })
})
