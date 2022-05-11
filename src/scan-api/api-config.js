export const apiBaseUri = `${window.location.host}/scan-api`;

let dummyAuthentication = false;

export const setDummyAuthentication = (state) =>
  (dummyAuthentication = !!state);
export const getDummyAuthentication = () => dummyAuthentication;
