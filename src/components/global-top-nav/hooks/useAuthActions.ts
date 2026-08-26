import { useAccount, useMsal } from '@azure/msal-react'
import { radixApiConfig } from '../../msal-auth-context/config'

export const useAuthActions = () => {
  const { instance } = useMsal()
  const account = useAccount()

  const signIn = async () => {
    await instance.loginRedirect({
      scopes: radixApiConfig.scopes,
      prompt: 'select_account',
    })
  }

  const signOut = async () => {
    await instance.logoutRedirect({ account, idTokenHint: account?.idToken })
  }

  return { account, signIn, signOut }
}
