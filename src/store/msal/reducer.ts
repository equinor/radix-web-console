import { createSlice } from '@reduxjs/toolkit';
import { AppContext } from '../../components/app-context';

type Store = {
  provider?: AppContext;
};

// Initial state
const initialState: Store = {
  provider: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProvider: (state, action: { payload: AppContext; type: string }) => {
      state.provider = action.payload;
    },
  },
});

export const { setProvider } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export const authReducer = authSlice.reducer;
export default authReducer;
