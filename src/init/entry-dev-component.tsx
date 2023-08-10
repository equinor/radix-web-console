import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from './store';

import { LazyLoadFallback } from '../components/lazy-load-fallback';
import { routes } from '../routes';

type DefaultModuleImport = { default: React.JSX.Element };

class DevComponent extends Component<
  { component: string },
  { content: React.JSX.Element }
> {
  private isLoaded: boolean;

  constructor(props: { component: string }) {
    super(props);
    this.state = { content: <LazyLoadFallback /> };
    this.isLoaded = true;

    this.fetchModule(props.component)
      .then(
        (module) => this.isLoaded && this.setState({ content: module.default })
      )
      .catch(
        () =>
          this.isLoaded &&
          this.setState({
            content: (
              <p>
                The file "dev.jsx" or "dev.tsx" does not exist for the component{' '}
                <strong>{component}</strong>.
              </p>
            ),
          })
      );
  }

  private async fetchModule(component: string): Promise<DefaultModuleImport> {
    return await import(`../components/${component}/dev.jsx`)
      .then((module: DefaultModuleImport) => module)
      .catch(() =>
        import(`../components/${component}/dev.tsx`).then(
          (module: DefaultModuleImport) => module
        )
      );
  }

  override componentWillUnmount() {
    this.isLoaded = false;
  }

  override render() {
    return this.state.content;
  }
}

const testPathMatch = window.location.pathname.match(
  RegExp(`^${routes.devComponent}`)
);
const component = testPathMatch?.[1];

export default (
  <Provider store={store}>
    <MemoryRouter>
      <DevComponent component={component} />
    </MemoryRouter>
  </Provider>
);
