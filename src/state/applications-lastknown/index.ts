import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

import { RootState } from '../../init/store';

const localStorageKey = 'lastKnownApplications';

const initialState: Array<string> =
  JSON.parse(localStorage.getItem(localStorageKey)) ?? [];

const putInLocalStorage = (state: Array<string>) =>
  localStorage.setItem(localStorageKey, JSON.stringify(state));

const lastKnownSlice = createSlice({
  name: 'lastKnownApplications',
  initialState,
  reducers: {
    addLastKnownApp(state, action: PayloadAction<string>) {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
        putInLocalStorage(state);
      }
      return state;
    },
    setLastKnownApps(state, action: PayloadAction<Array<string>>) {
      if (!isEqual(state, action.payload)) {
        state = action.payload;
        putInLocalStorage(state);
      }
      return state;
    },
  },
});

export const getMemoizedLastKnownApplications = createSelector(
  (state: RootState) => state.lastKnownApplications,
  (lastKnownApplications) => lastKnownApplications
);

export const { addLastKnownApp, setLastKnownApps } = lastKnownSlice.actions;

export default lastKnownSlice.reducer;
