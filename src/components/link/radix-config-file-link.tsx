import type { ApplicationRegistration } from '../../store/radix-api';
import { ExternalLink } from './external-link';

type Props = { registration?: ApplicationRegistration };

function configFileFullName(radixConfigFullName: string): string {
  return radixConfigFullName || 'radixconfig.yaml';
}

function configFileUrl({
  configBranch,
  radixConfigFullName,
  repository,
}: ApplicationRegistration): string {
  return `${repository}/blob/${configBranch}/${configFileFullName(
    radixConfigFullName
  )}`;
}

export const RadixConfigFileLink = ({ registration }: Props) => (
  <ExternalLink href={configFileUrl(registration)}>
    {configFileFullName(registration.radixConfigFullName)}
  </ExternalLink>
);