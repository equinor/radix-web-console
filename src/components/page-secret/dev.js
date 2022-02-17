import { SecretOverview } from './secret-overview';

import { RequestState } from '../../state/state-utils/request-states';

const noop = () => null;

const props = {
  appName: 'example-1',
  envName: 'production',
  componentName: 'www',
  resetSaveStates: noop,
  saveError: 'Boom!',
  saveSecret: noop,
  saveState: RequestState.IDLE,
  secretName: 'A_SECRET',
  secret: {
    name: 'A_SECRET',
    component: 'www',
    status: 'Consistent',
  },
  subscribe: noop,
  unsubscribe: noop,
};

export default (
  <div style={{ backgroundColor: 'white', padding: '60px 0' }}>
    <div className="o-layout-constrained" style={{ margin: 'auto' }}>
      <SecretOverview {...props} />
    </div>
  </div>
);
