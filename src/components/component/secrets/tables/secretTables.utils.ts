import type { Secret } from '../../../../store/radix-api'

export function getSecretDisplayName({ displayName, name }: Pick<Secret, 'displayName' | 'name'>): string {
  return displayName || name
}
