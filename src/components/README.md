# Radix Web Console — Components

Each subdirectory corresponds to a standalone component.

## The component directory

Each component directory contains the following files:

### `index.js`

The main file for the component; in many cases this is the only file necessary.
This is a JS module that exports as default the whole component:

```js
const MyComponent = … ;

export default MyComponent;
```

If the component is meant to be used with bindings (e.g. decorated with Redux's
`connect()`, react-rounter's `withRouter()`, etc.) then the default export
should contain these bindings, and a named export should expose the bare
component (used for testing). For instance:

```js
const MyComponent = … ;

export default connect(mapStateToProps)(MyComponent);
export MyComponent;
```
### `style.css`

This contains namespaced component styling. Every CSS rule in this file must be
prefixed with a unique classname (usually the same as the component). Code is
organised using [BEM](https://css-tricks.com/bem-101/). See also CSS guidelines
in [the main README file](../../README.md#CSS).

Example:

```css
.notification {
  …
}

.notification__actions {
  …
}

.notification--important {
  …
}
```

### `test.js`

Smoke tests for the component. These should not use any features of decorators
like Redux, etc. — instead always import the bare component from the `.js` file.
Tests should use [Enzyme](http://airbnb.io/enzyme/) for rendering the component.

```jsx
import React from 'react';
import { shallow } from 'enzyme';
import { MyComponent } from '.';

it('renders without crashing', () => {
  shallow(<MyComponent />);
});
```

To decide on what to test on a component, take a look at this article:
[The Right Way to Test React Components](https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22).

### `dev.js`

This file should return a standalone instance of the component (or several, with
different props). This is used for development of the component in isolation,
allowing styling, prop testing, etc, without needing all of the application
data.

To access a component's `dev.js` file go to the URL at
<code>localhost:3000/dev-component/<i>component-name</i></code>. The page will
have access to a full app environment; it's only the React component that is
isolated. For instance, these will work:

  - react-router
  - the redux store (including all reducers and sagas)
  - global styling (from files within `/src/style/`)

A simple example:

```jsx
import React from 'react';
import { MyComponent } from '.';

export default (
  <div>
    <MyComponent myMrop="aValue" />
    <MyComponent myMrop="bValue" />
  </div>
);
```

### `integration.js`

This file can be used to develop the component in a mocked network environment.
Websocket communication and `fetch()` calls are mocked to provide a full life
cycle environment to the component, including asynchronous behaviour. The user
is also marked as logged in.

To access a component's `integration.js` file go to the URL at
<code>localhost:3000/dev-integration/<i>component-name</i></code>.

The file should export a function `injectMockSocketServers`, that receives an
object with all mocked websockets that can be listened and responded to. See the
file `/components/app-list/integration.js` for an example.

Any `fetch()` requests can be mocked by importing `fetch-mock` and declaring the
requested URLs and responses, e.g.

```js
fetchMock.get(myUrl, { response: 'data' });
```

For more details, check [fetch-mock](http://www.wheresrhys.co.uk/fetch-mock/)
and [mock-socket](https://github.com/thoov/mock-socket).

An example:

```jsx
import React from 'react';
import fetchMock from 'fetch-mock';

import MyComponent from '.';

export const injectMockSocketServers = servers => {
  servers.rr.on('connection', socket => socket.send('rr data'));
  servers.ra.on('connection', socket => socket.send('ra data'));
}

fetchMock.post('/path/create-object', 200);

export default (
  <MyComponent myMrop="aValue" />
);
```
