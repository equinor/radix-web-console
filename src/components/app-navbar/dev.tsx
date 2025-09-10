import { AppNavbar } from '.'

const appName = 'radix-web-console'

export default (
  <div
    style={{
      margin: 'auto',
      marginTop: 50,
      display: 'grid',
      gridAutoColumns: 'max-content',
      justifyContent: 'center',
    }}
  >
    <div style={{ backgroundColor: 'white' }}>
      <AppNavbar appName={appName} />
    </div>
  </div>
)
