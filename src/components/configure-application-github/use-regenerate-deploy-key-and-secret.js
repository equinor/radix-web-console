import { nanoid } from 'nanoid';

import { usePostJson } from '../../effects';

export const useRegenerateDeployKeyAndSecret = (appName) =>
  usePostJson(`/applications/${appName}/regenerate-deploy-key`, () => ({
    sharedSecret: nanoid(),
  }));

export default useRegenerateDeployKeyAndSecret;
