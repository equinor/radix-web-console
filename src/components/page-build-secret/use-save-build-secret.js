import { usePutJson } from '../../effects';

const UseSaveBuildSecrets = (appName, secretName) => {
  const url = `/applications/${appName}/buildsecrets/${secretName}`;

  return usePutJson(url, newValue => {
    return { secretValue: newValue ? newValue.toString() : null };
  });
};

export default UseSaveBuildSecrets;
