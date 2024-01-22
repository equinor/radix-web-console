import { createSlice } from '@reduxjs/toolkit';
import { AppContext } from '../../components/app-context';
import { AccountInfo } from '@azure/msal-browser';

type Store = {
  provider?: AppContext;
  account?: AccountInfo;
};

// Initial state
const initialState: Store = {
  provider: null,
  account: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProvider: (state, action: { payload: AppContext; type: string }) => {
      state.provider = action.payload;
    },
    setAccount: (state, action: { payload: AccountInfo; type: string }) => {
      state.account = action.payload;
    },
  },
});

export const { setProvider, setAccount } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export const authReducer = authSlice.reducer;
export default authReducer;
