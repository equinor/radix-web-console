import { AppNavbar } from '.';

const appName: string = 'radix-api';
const envs: Array<string> = ['dev', 'qa', 'prod', 'yoto', 'poco'];

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
      <AppNavbar appName={appName} envs={envs} />
    </div>
  </div>
);
