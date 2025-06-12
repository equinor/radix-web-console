import { Button, Typography } from "@equinor/eds-core-react";

export default function SessionExpired() {
  const handleReauth = () => {
    sessionStorage.clear();
    window.location.href = "/applications";
  };

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
      <img
        src="/src/components/home-icon/logos/logo-radix.svg"
        alt="Radix Logo"
        width={80}
        height={80}
        style={{ marginBottom: 32 }}
      />
      <Typography variant="h1">Session expired</Typography>
      <Typography style={{ marginTop: 16, marginBottom: 32 }}>
        Your session has expired. Please re-authenticate to continue.
      </Typography>
      <Button
        type="button"
        color="primary"
        onClick={handleReauth}
      >
        Re-authenticate
      </Button>
    </div>
  );
}
