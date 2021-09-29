import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = Array<string>;
const localStorageKey = 'favouriteApplications';

const initialState: State =
  JSON.parse(localStorage.getItem(localStorageKey)) || [];

const putInLocalStorage = (state: State) =>
  localStorage.setItem(localStorageKey, JSON.stringify(state));

const favouritesSlice = createSlice({
  name: 'favouriteApplications',
  initialState,
  reducers: {
    toggleFavouriteApp(state, action: PayloadAction<string>) {
      const idx = state.findIndex((x) => x === action.payload);
      idx < 0 ? state.push(action.payload) : state.splice(idx, 1);
      putInLocalStorage(state);
      return state;
    },
  },
});

export const { toggleFavouriteApp } = favouritesSlice.actions;

export default favouritesSlice.reducer;
