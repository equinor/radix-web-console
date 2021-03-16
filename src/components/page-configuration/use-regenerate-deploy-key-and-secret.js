import { usePostJson } from '../../effects';
var phraseit = require('phraseit');

const useRegenerateDeployKeyAndSecret = (appName) => {
  const path = `/applications/${appName}/regenerate-deploy-key`;
  var sharedSecret = phraseit.make('{{an_adjective}} {{adjective}} {{noun}}');
  return usePostJson(path, (deployKeyAndSecretData) => {
    return {
      sharedSecret: sharedSecret,
    };
  });
};

export default useRegenerateDeployKeyAndSecret;
