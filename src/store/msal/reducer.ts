import { createSlice } from '@reduxjs/toolkit'
import type { MsalContext } from '../../components/msal-auth-context/msal-auth-provider'

type Store = {
  provider?: MsalContext
}

// Initial state
const initialState: Store = {
  provider: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProvider: (state, action: { payload: MsalContext; type: string }) => {
      state.provider = action.payload
    },
  },
})

export const { setProvider } = authSlice.actions
export const authReducer = authSlice.reducer
export default authReducer
