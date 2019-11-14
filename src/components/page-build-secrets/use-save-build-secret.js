import usePutJson from '../../effects/use-put-json';

const UseSaveBuildSecrets = (appName, secretName, newValue) => {
  const url = `/applications/${appName}/buildsecrets/${secretName}`;
  const resource = 'radix_api';
  const body = { secretValue: newValue ? newValue.toString() : null };

  return usePutJson(url, resource, body, newValue);
};

export default UseSaveBuildSecrets;
