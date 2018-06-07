import { getResource } from './config';
import { authorize } from './auth';

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const createUrl = (path, resource) =>
  `${getResource(resource).baseUrl}${path}`;

export const getJson = (path, resource) =>
  authorize(resource).then(r =>
    fetch(createUrl(resource, path), {
      method: 'GET',
      withCredentials: true,
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${r.accessToken}`,
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new NetworkException(response.statusText, response.status);
    })
  );

export const postJson = (path, data, resource) => (
  authorize(resource)
    .then(r =>
      fetch(createUrl(resource, path), {
        method: 'POST',
        body: JSON.stringify(data),
        withCredentials: true,
        headers: {
          ...jsonHeaders,
          Authorization: `Bearer ${r.accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new NetworkException(response.statusText, response.status);
        }))
);
