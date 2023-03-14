import { Server } from 'mock-socket';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import store from './store';

import { createRadixApiUrl } from '../api/api-config';
import { routes } from '../routes';

// Set up mock socket servers
// TODO: When using only Socket.io, clean this up to provide only one socket
const mockServerRR = new Server(
  createRadixApiUrl('radixregistrations', 'wss:') + '?watch=true'
);
const mockServerRA = new Server(
  createRadixApiUrl('radixapplications', 'wss:') + '?watch=true'
);

require('fetch-mock').post('*', { thisIsADummyResponse: true });

// Load the requested content
const testPathMatch = window.location.pathname.match(
  RegExp(`^${routes.devIntegration}`)
);
const component = testPathMatch[1];

let content: JSX.Element;
try {
  const integration: {
    injectMockSocketServers: (servers: { rr: Server; ra: Server }) => void;
    default: JSX.Element;
  } = require(`../components/${component}/integration`);
  content = integration.default;

  // TODO: When using only Socket.io, clean this up to provide only one socket
  integration.injectMockSocketServers({
    rr: mockServerRR,
    ra: mockServerRA,
  });
} catch (e) {
  content = (
    <p>
      The file "integration.js" does not exist for the component{' '}
      <strong>{component}</strong>.
    </p>
  );
}

export default (
  <Provider store={store}>
    <MemoryRouter>{content}</MemoryRouter>
  </Provider>
);
