export function getValidatedOAuthType(type?: 'oauth' | 'oauth-redis' | '""') {
  return type && type.length > 0 ? type : 'oauth';
}
export function getOAuthServiceTitle(type?: 'oauth' | 'oauth-redis' | '""') {
  return type === 'oauth-redis' ? 'Redis' : 'Proxy';
}
