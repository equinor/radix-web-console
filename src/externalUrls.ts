import { clusterBases } from './clusterBases'
import { extractCweNumber } from './utils/cwe'

// biome-ignore format: long lines
export const externalUrls = {
  community: 'https://www.radix.equinor.com/community',
  documentation: 'https://www.radix.equinor.com',
  guideDockerfileComponent: 'https://www.radix.equinor.com/start/config-your-app/#a-dockerfile-per-component',
  guideGettingAccess: 'https://www.radix.equinor.com/start/getting-access/',
  referenceRadixConfig: 'https://www.radix.equinor.com/radix-config',
  slackRadix: 'https://equinor.slack.com/messages/C8U7XGGAJ',
  slackRadixSupport: 'https://equinor.slack.com/messages/CBKM6N2JY',
  deployOnlyGuide: 'https://www.radix.equinor.com/guides/deploy-only/',
  alertingGuide: 'https://www.radix.equinor.com/guides/alerting/',
  externalDNSGuide: 'https://www.radix.equinor.com/guides/external-alias/',
  workloadIdentityGuide: 'https://www.radix.equinor.com/guides/workload-identity/',
  uptimeDocs: 'https://radix.equinor.com/docs/topic-uptime/',
  resourcesDocs: 'https://radix.equinor.com/guides/resource-request/',
  kubernetesResourcesCpuUnits: 'https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu',
  kubernetesResourcesMemoryUnits: 'https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory',
  radixPlatformWebConsole: `https://console.${clusterBases.radixPlatformWebConsole}/`,
  radixPlatform2WebConsole: `https://console.${clusterBases.radixPlatform2WebConsole}/`,
  playgroundWebConsole: `https://console.${clusterBases.playgroundWebConsole}/`,
  cveVulnerabilityInformation: (cve: string) => `https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cve}`,
  cweVulnerabilityInformation: (cwe: string) => `https://cwe.mitre.org/data/definitions/${extractCweNumber(cwe)}.html`,
} as const;
