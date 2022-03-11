import { nanoid } from 'nanoid';

import { usePostJson } from '../../effects';

export const useRegenerateDeployKeyAndSecret = (appName) => {
  const path = `/applications/${appName}/regenerate-deploy-key`;
  const sharedSecret = nanoid();

  return usePostJson(path, () => {
    return {
      sharedSecret: sharedSecret,
    };
  });
};

export default useRegenerateDeployKeyAndSecret;
