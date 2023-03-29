import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../init/store';

const localStorageKey = 'favouriteApplications';

const initialState: Array<string> =
  JSON.parse(localStorage.getItem(localStorageKey)) ?? [];

const putInLocalStorage = (state: Array<string>): void =>
  localStorage.setItem(localStorageKey, JSON.stringify(state));

const favouritesSlice = createSlice({
  name: 'favouriteApplications',
  initialState,
  reducers: {
    toggleFavouriteApp(state, { payload }: PayloadAction<string>) {
      const idx = state.findIndex((x) => x === payload);
      idx < 0 ? state.push(payload) : state.splice(idx, 1);
      putInLocalStorage(state);
      return state;
    },
  },
});

export const getMemoizedFavouriteApplications = createSelector(
  (state: RootState) => state.favouriteApplications,
  (favouriteApplications) => favouriteApplications
);

export const {
  actions: { toggleFavouriteApp },
  reducer,
} = favouritesSlice;

export default reducer;
