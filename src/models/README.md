# Radix Web Console — Models

Each subfolder here contains a normaliser function (exported from `normaliser.js`) as well as a [PropType](https://www.npmjs.com/package/prop-types)-based schema (`index.js`).

The models should be used as PropTypes for any components that receive these data types as props, e.g.

```jsx
import PropTypes from 'prop-types';
import React from 'react';
import EnvironmentModel from '../../models/environment';

const MyComponent = ({ env }) => (
  // …
);

MyComponent.propTypes = {
  env: PropTypes.exact(EnvironmentModel).isRequired
};
```

The normalisers should be used when consuming data from the API — this should be done in the Redux reducers in the `/state` tree, e.g.:

```jsx
import { ApplicationSummaryNormaliser } from '../../models/application-summary/normaliser';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPS_SNAPSHOT:
      return action.payload.map(ApplicationSummaryNormaliser);

    // ...
  }
}
```
