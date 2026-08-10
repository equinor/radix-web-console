import { Button, Typography } from '@equinor/eds-core-react'
import { HomeIcon } from '../../components/home-icon'

export default function SessionExpiredPage() {
  /**
   * Must stay a full-page navigation: it's what clears the cached terminalAuthError
   * guard in store/msal/interactive-auth.ts. A popup/SPA re-login would leave the
   * guard set and lock the user out, clear it explicitly if you change this.
   */
  const handleReauth = () => {
    sessionStorage.clear()
    window.location.href = '/applications' // Do not remove this without reading function comment above.
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
      }}
    >
      <HomeIcon style={{ width: 80, height: 80, marginBottom: 32 }} />
      <Typography variant="h1">Session expired</Typography>
      <Typography style={{ marginTop: 16, marginBottom: 32 }}>
        Your session has expired. Please re-authenticate to continue.
      </Typography>
      <Button type="button" color="primary" onClick={handleReauth}>
        Re-authenticate
      </Button>
    </div>
  )
}
