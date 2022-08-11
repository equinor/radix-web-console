export let apiBaseUri;

if (process.env.REACT_APP_RADIX_API_URL) {
  apiBaseUri = `${process.env.REACT_APP_RADIX_API_URL}/api/v1`;
} else {
  apiBaseUri = `${window.location.host}/api/v1`;
}

let dummyAuthentication = false;

export const setDummyAuthentication = (state) =>
  (dummyAuthentication = !!state);
export const getDummyAuthentication = () => dummyAuthentication;
