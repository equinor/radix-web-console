import { SecretOverview } from './secret-overview';

import { SecretStatus } from '../../models/secret-status';
import { RequestState } from '../../state/state-utils/request-states';

const noop = () => null;

export default (
  <div
    style={{
      backgroundColor: 'var(--eds_ui_background__default)',
      padding: 'var(--eds_spacing_large)',
    }}
  >
    <div className="o-layout-constrained" style={{ margin: 'auto' }}>
      <SecretOverview
        appName="example1"
        componentName="www"
        envName="production"
        secretName="secret"
        saveState={RequestState.IDLE}
        secret={{
          name: 'A_SECRET',
          component: 'www',
          status: SecretStatus.Consistent,
        }}
        subscribe={noop}
        unsubscribe={noop}
        refreshEnvironment={noop}
        resetSaveStates={noop}
        saveSecret={noop}
      />
    </div>
  </div>
);
