export type AdProfile = {
  userName: string
  profile: {
    upn: string
    name: string
    family_name: string
    given_name: string
    iss: string
    ipaddr: string
  }
}

export type UserProfile = {
  userId: string
  uniqueId: string
  displayableId: string
  familyName: string
  givenName: string
  identityProvider: string
  ipaddr: string
}

export function activeDirectoryProfileToUser(adProfile: AdProfile): UserProfile {
  return {
    userId: adProfile.userName,
    uniqueId: adProfile.profile.upn,
    displayableId: adProfile.profile.name,
    familyName: adProfile.profile.family_name,
    givenName: adProfile.profile.given_name,
    identityProvider: adProfile.profile.iss,
    ipaddr: adProfile.profile.ipaddr,
  }
}
