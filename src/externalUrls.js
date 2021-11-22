import { extractCweNumber } from './utils/cwe';

export default Object.freeze({
  community: 'https://www.radix.equinor.com/community.html',
  documentation: 'https://www.radix.equinor.com',
  guideDockerfileComponent:
    'https://www.radix.equinor.com/guides/configure-an-app/#a-dockerfile-per-component',
  guideGettingAccess:
    'https://www.radix.equinor.com/guides/getting-started/#getting-access',
  idweb: 'https://idweb.statoil.net/IdentityManagement/default.aspx',
  referenceRadixConfig:
    'https://www.radix.equinor.com/docs/reference-radix-config/',
  slackRadix: 'https://equinor.slack.com/messages/C8U7XGGAJ',
  slackRadixSupport: 'https://equinor.slack.com/messages/CBKM6N2JY',
  radixClusters:
    'https://www.radix.equinor.com/guides/getting-started/#production-us---proof-of-concept',
  deployOnlyGuide: 'https://www.radix.equinor.com/guides/deploy-only/',
  alertingGuide: 'https://www.radix.equinor.com/guides/alerting/',
  radixPlatformWebConsole: 'https://console.radix.equinor.com/',
  playgroundWebConsole: 'https://console.playground.radix.equinor.com/',
  cveVulnerabilityInformation: (cve) =>
    'https://cve.mitre.org/cgi-bin/cvename.cgi?name=' + cve,
  cweVulnerabilityInformation: (cwe) => {
    return (
      'https://cwe.mitre.org/data/definitions/' +
      extractCweNumber(cwe) +
      '.html'
    );
  },
});
