export function activeDirectoryProfileToUser(adProfile) {
  return {
    userId: adProfile.userName,
    uniqueId: adProfile.profile.upn,
    displayableId: adProfile.profile.name,
    familyName: adProfile.profile.family_name,
    givenName: adProfile.profile.given_name,
    identityProvider: adProfile.profile.iss,
    ipaddr: adProfile.profile.ipaddr,
  };
}
