import { createSlice } from '@reduxjs/toolkit';
import type { MsalContext } from '../../components/msal-auth-context/msal-auth-provider';
import type { AccountInfo } from '@azure/msal-browser';

type Store = {
  provider?: MsalContext;
  account?: AccountInfo;
};

// Initial state
const initialState: Store = {
  provider: undefined,
  account: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProvider: (state, action: { payload: MsalContext; type: string }) => {
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
