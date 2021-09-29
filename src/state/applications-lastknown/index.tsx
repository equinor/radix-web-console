import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

type State = Array<string>;
const localStorageKey = 'lastKnownApplications';

const initialState: State =
  JSON.parse(localStorage.getItem(localStorageKey)) || [];

const putInLocalStorage = (state: State) =>
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

export const { addLastKnownApp, setLastKnownApps } = lastKnownSlice.actions;

export default lastKnownSlice.reducer;
