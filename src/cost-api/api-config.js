export const apiBaseUri = `${window.location.host}/cost-api/v1`;

let dummyAuthentication = false;

export const setDummyAuthentication = (state) =>
  (dummyAuthentication = !!state);
export const getDummyAuthentication = () => dummyAuthentication;
