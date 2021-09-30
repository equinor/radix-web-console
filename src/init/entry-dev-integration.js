import fetchMock from 'fetch-mock';
import { Server } from 'mock-socket';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import store from './store';

import { createApiUrl } from '../api/api-helpers';
import { routes } from '../routes';

// Set up mock socket servers
// TODO: When using only Socket.io, clean this up to provide only one socket

const mockServerRR = new Server(
  createApiUrl('radixregistrations', 'radix_api', 'wss:') + '?watch=true'
);

const mockServerRA = new Server(
  createApiUrl('radixapplications', 'radix_api', 'wss:') + '?watch=true'
);

// Set up mock fetch()

fetchMock.post('*', { thisIsADummyResponse: true });

// Load the requested content

const testPathMatch = window.location.pathname.match(
  RegExp(`^${routes.devIntegration}`)
);

let component = testPathMatch[1];
let integration, content;

try {
  integration = require(`../components/${component}/integration`);
  content = integration.default;
} catch (e) {
  content = (
    <p>
      The file "integration.js" does not exist for the component{' '}
      <strong>{component}</strong>.
    </p>
  );
}

if (integration) {
  // TODO: When using only Socket.io, clean this up to provide only one socket
  integration.injectMockSocketServers({
    rr: mockServerRR,
    ra: mockServerRA,
  });
}

export default (
  <Provider store={store}>
    <MemoryRouter>{content}</MemoryRouter>
  </Provider>
);
