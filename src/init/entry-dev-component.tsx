import type React from 'react'
import { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { LazyLoadFallback } from '../components/lazy-load-fallback'
import { routes } from '../router/routes'
import store from '../store/store'
import { DEV_LOOKUP_FOLDERS } from './dev-folders.consts'

type DefaultModuleImport = { default: React.JSX.Element }

class DevComponent extends Component<{ component?: string }, { content: React.JSX.Element }> {
  private isLoaded: boolean

  constructor(props: { component: string }) {
    super(props)
    this.state = { content: <LazyLoadFallback /> }
    this.isLoaded = true

    this.fetchModule(props.component)
      .then((module) => this.isLoaded && this.setState({ content: module.default }))
      .catch(
        () =>
          this.isLoaded &&
          this.setState({
            content: (
              <p>
                The file "dev.jsx" or "dev.tsx" does not exist for the component <strong>{component}</strong>.
              </p>
            ),
          })
      )
  }

  private async fetchModule(component: string): Promise<DefaultModuleImport> {
    // Looks for a dev file in both the components and pages folders, as both may contain components with dev files
    for (const folder of DEV_LOOKUP_FOLDERS) {
      try {
        const path = `../${folder}/${component}/dev.tsx`
        return await import(/* @vite-ignore */ path)
      } catch {
        /* try next folder */
      }
    }

    throw Error('Not found')
  }

  override componentWillUnmount() {
    this.isLoaded = false
  }

  override render() {
    return this.state.content
  }
}

const testPathMatch = window.location.pathname.match(RegExp(`^${routes.devComponent}`))
const component = testPathMatch?.[1]

export default (
  <Provider store={store}>
    <BrowserRouter>
      <DevComponent component={component} />
    </BrowserRouter>
  </Provider>
)
