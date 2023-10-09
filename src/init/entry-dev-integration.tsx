import fetchMock from 'fetch-mock';
import { Server } from 'mock-socket';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import store from './store';

import { createRadixApiUrl } from '../api/api-config';
import { LazyLoadFallback } from '../components/lazy-load-fallback';
import { routes } from '../routes';

type IntegrationType = {
  injectMockSocketServers: (servers: { rr: Server; ra: Server }) => void;
  default: React.JSX.Element;
};

fetchMock.post('*', { thisIsADummyResponse: true });

class IntegrationComponent extends Component<
  { component: string },
  { content: React.JSX.Element }
> {
  private isLoaded: boolean;

  constructor(props: { component: string }) {
    super(props);
    this.state = { content: <LazyLoadFallback /> };
    this.isLoaded = true;

    this.fetchModule(props.component)
      .then((module) => {
        if (this.isLoaded && module) {
          // Set up mock socket servers
          // TODO: When using only Socket.io, clean this up to provide only one socket
          const mockServerRR = new Server(
            createRadixApiUrl('radixregistrations', 'wss:') + '?watch=true'
          );
          const mockServerRA = new Server(
            createRadixApiUrl('radixapplications', 'wss:') + '?watch=true'
          );

          module.injectMockSocketServers({
            rr: mockServerRR,
            ra: mockServerRA,
          });
          this.setState({ content: module.default });
        }
      })
      .catch(
        () =>
          this.isLoaded &&
          this.setState({
            content: (
              <p>
                The file "integration.jsx" or "integration.tsx" does not exist
                for the component <strong>{component}</strong>.
              </p>
            ),
          })
      );
  }

  private async fetchModule(component: string): Promise<IntegrationType> {
    for (const ext of ['jsx', 'tsx']) {
      try {
        const path = `../components/${component}/integration.${ext}`;
        return await import(/* @vite-ignore */ path).then(
          (module: IntegrationType) => module
        );
      } catch (err) {
        /* empty */
      }
    }

    throw Error('Not found');
  }

  override componentWillUnmount() {
    this.isLoaded = false;
  }

  override render() {
    return this.state.content;
  }
}

const testPathMatch = window.location.pathname.match(
  RegExp(`^${routes.devIntegration}`)
);
const component = testPathMatch?.[1];

export default (
  <Provider store={store}>
    <MemoryRouter>
      <IntegrationComponent component={component} />
    </MemoryRouter>
  </Provider>
);
