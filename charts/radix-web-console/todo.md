Todo:

Install radix github app

register
 - variable GH_APP_ID,
 - secret GH_APP_PRIVATE_KEY

## FluxCD / release steps

Before release:
 - Create the target namespace (or let the Flux Kustomization/HelmRelease create it).
 - Add a Flux source for the chart:
     - OCIRepository/HelmRepository pointing at the pushed chart, or a GitRepository
       pointing at this repo's `charts/radix-web-console`.
 - Create a HelmRelease referencing the chart and pin `image.tag` to the released version.
 - Provide the required Helm values (per cluster/env), e.g. via HelmRelease `values`
   or a values ConfigMap/Secret + `valuesFrom`:
     - config.dnsZone, config.clusterName, config.clusterType, config.environment
     - config.oauth2.clientId, config.oauth2.authority, config.oauth2.knownAuthorities
     - config.radixApiScopes, config.serviceNowProxyScopes, config.serviceNowProxyBaseUrl
     - config.cmdbCiUrl, config.clusters
     - upstreams.apiUrl, upstreams.costApiUrl, upstreams.logApiUrl, upstreams.scanApiUrl, upstreams.uptimeUrl
       (full URLs — injected here, no longer derived by the chart)
 - Expose the console: enable `ingress` (className, host, annotations, tls) or
   `httproute` (parentRefs/hostnames), plus DNS record and TLS certificate.
 - If using Flux image automation: set up ImageRepository + ImagePolicy
   (+ ImageUpdateAutomation) for ghcr.io/equinor/radix-web-console.
 - Secrets (GH_APP_PRIVATE_KEY etc.) managed via SOPS/sealed-secrets and referenced
   by the HelmRelease/Kustomization.

After release:
 - `flux reconcile kustomization/helmrelease` and confirm it reaches Ready.
 - Verify Deployment rolled, ConfigMap rendered, and the `checksum/config` annotation
   changes on config updates (pods restart automatically).
 - Verify the console is reachable at the configured host over HTTPS.
 - Register the console redirect URI(s) in the Azure AD app registration for OAuth2.

