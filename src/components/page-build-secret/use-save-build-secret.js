import { usePutJson } from '../../effects';

const UseSaveBuildSecrets = (appName, secretName, newValue) => {
  const url = `/applications/${appName}/buildsecrets/${secretName}`;
  const body = { secretValue: newValue ? newValue.toString() : null };

  return usePutJson(url, body);
};

export default UseSaveBuildSecrets;
