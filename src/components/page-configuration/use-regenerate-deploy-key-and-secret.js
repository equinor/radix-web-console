import { usePostJson } from '../../effects';
var phraseit = import('phraseit');

const useRegenerateDeployKeyAndSecret = (appName) => {
  const path = `/applications/${appName}/regenerate-deploy-key`;
  var sharedSecret = 'test'; //phraseit.make('{{an_adjective}} {{adjective}} {{noun}}');
  let processRequestData = '{"sharedSecret":"' + sharedSecret + '"}';
  return usePostJson(path, processRequestData);
};

export default useRegenerateDeployKeyAndSecret;
