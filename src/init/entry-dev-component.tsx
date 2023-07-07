import { CircularProgress } from '@equinor/eds-core-react';
import { ConnectedRouter } from 'connected-react-router';
import { Component } from 'react';
import { Provider } from 'react-redux';

import store, { history } from './store';

import { routes } from '../routes';

type DefaultModuleImport = { default: JSX.Element };

class DevComponent extends Component<
  { component: string },
  { content: JSX.Element }
> {
  private isLoaded: boolean;

  constructor(props: { component: string }) {
    super(props);
    this.state = {
      content: (
        <span>
          <CircularProgress size={16} /> Loading...
        </span>
      ),
    };
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
    return await import(/* @vite-ignore */ `../components/${component}/dev.jsx`)
      .then((module: DefaultModuleImport) => module)
      .catch(() =>
        import(/* @vite-ignore */ `../components/${component}/dev.tsx`).then(
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
    <ConnectedRouter history={history}>
      <DevComponent component={component} />
    </ConnectedRouter>
  </Provider>
);
