export enum SecretType {
  SecretTypeGeneric = 'generic',
  SecretTypeClientCert = 'client-cert',
  SecretTypeAzureBlobFuseVolume = 'azure-blob-fuse-volume',
  SecretTypeCsiAzureBlobVolume = 'csi-azure-blob-volume',
  SecretTypeCsiAzureKeyVaultCreds = 'csi-azure-key-vault-creds',
  SecretTypeCsiAzureKeyVaultItem = 'csi-azure-key-vault-item',
  SecretTypeClientCertificateAuth = 'client-cert-auth',
  SecretTypeOAuth2Proxy = 'oauth2-proxy',
}
