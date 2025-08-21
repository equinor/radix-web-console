import type React from 'react';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../store/store';

import { LazyLoadFallback } from '../components/lazy-load-fallback';
import { routes } from '../routes';

type DefaultModuleImport = { default: React.JSX.Element };

class DevComponent extends Component<
  { component?: string },
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
    for (const ext of ['jsx', 'tsx']) {
      try {
        const path = `../components/${component}/dev.${ext}`;
        return await import(/* @vite-ignore */ path).then(
          (module: DefaultModuleImport) => module
        );
      } catch (_) {
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
  RegExp(`^${routes.devComponent}`)
);
const component = testPathMatch?.[1];

export default (
  <Provider store={store}>
    <BrowserRouter>
      <DevComponent component={component} />
    </BrowserRouter>
  </Provider>
);
