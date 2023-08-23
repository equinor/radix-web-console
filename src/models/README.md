# Radix Web Console — Models

Models are separated into API directories based on the API they generally belong to (such as `radix-api` and `log-api` for `Radix Api` and `Radix Log Api` respectively).
Each subfolder within contains a normalizer function (exported from `normalizer.ts`) as well as a TypeScript Model definition and a [PropType](https://www.npmjs.com/package/prop-types) - based schema (`index.ts`).

The models should be used as PropTypes for any components that receive these data types as props, e.g.

```tsx
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../models/radix-api/environment';

const MyComponent: FunctionComponent<{ env: EnvironmentModel }> = (props) => (
  // …
);

MyComponent.propTypes = {
  env: PropTypes.shape(EnvironmentModelValidationMap).isRequired
};
```

The normalizers should be used when consuming data from the API — this should be done in the Redux reducers in the `/state` tree, e.g.:

```ts
import { createAction, createSlice } from '@reduxjs/toolkit';

import { actionTypes } from './action-types';
import { EnvironmentModel } from '../../models/radix-api/environments/environment';
import { EnvironmentModelNormalizer } from '../../models/radix-api/environments/environment/normalizer';

const initialState: EnvironmentModel = {
  // …
};

const snapshotAction = createAction<EnvironmentModel>(
  actionTypes.ENVIRONMENT_SNAPSHOT
);

const envSlice = createSlice({
  name: 'environment',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (_, { payload }) =>
        EnvironmentModelNormalizer(payload)
      )
      // …
      .addDefaultCase((state) => state),
});

export const reducer = envSlice.reducer;
export default reducer;
```
