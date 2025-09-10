import { Accordion, Typography } from '@equinor/eds-core-react'
import { routes } from '../../routes'
import { pollingInterval } from '../../store/defaults'
import { type ApplicationRegistration, radixApi, useGetDeployKeyAndSecretQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'
import AsyncResource from '../async-resource/async-resource'
import { Breadcrumb } from '../breadcrumb'
import { DocumentTitle } from '../document-title'
import { ExternalLink } from '../link/external-link'
import { RadixConfigFileLink } from '../link/radix-config-file-link'
import { BuildSecretsAccordion } from './build-secrets-accordion'
import ChangeAdminForm from './change-admin-form'
import { ChangeConfigurationItemForm } from './change-ci-form'
import { ChangeConfigBranchForm } from './change-config-branch-form'
import { ChangeConfigFileForm } from './change-config-file-form'
import { ChangeRepositoryForm } from './change-repository-form'
import DeleteApplicationForm from './delete-application-form'
import { ImageHubsAccordion } from './image-hubs-accordion'
import { Overview } from './overview'
import './style.css'
import { ConfigureDeployKey } from '../configure-application-github/configure-deploy-key'
import { ConfigureGitHubWebhook } from '../configure-application-github/configure-git-hub-webhook'
import { RegenerateDeployKeyScrim } from '../configure-application-github/regenerate-deploy-key-scrim'
import { RegenerateSharedSecretScrim } from '../configure-application-github/regenerate-shared-secret-scrim'

function getConfigBranch(configBranch?: string): string {
  return configBranch || 'master'
}

function getConfigBranchUrl({ configBranch, repository }: ApplicationRegistration): string {
  return `${repository}/tree/${getConfigBranch(configBranch)}`
}

export function PageConfiguration({ appName }: { appName: string }) {
  const { data: application, refetch, ...reqState } = radixApi.useGetApplicationQuery({ appName }, { pollingInterval })
  const registration = application?.registration

  const { data: secrets, refetch: refetchSecrets } = useGetDeployKeyAndSecretQuery(
    { appName: appName },
    { pollingInterval }
  )

  return (
    <main>
      <DocumentTitle title={`${appName} Configuration`} />
      <Breadcrumb
        links={[{ label: appName, to: routeWithParams(routes.app, { appName }) }, { label: 'Configuration' }]}
      />

      <AsyncResource asyncState={reqState}>
        {registration?.name && (
          <>
            <Overview adGroups={registration.adGroups ?? []} adUsers={registration.adUsers ?? []} appName={appName} />
            <section className="grid grid--gap-medium">
              <Typography variant="h4">GitHub</Typography>
              <Typography>
                Cloned from <ExternalLink href={registration.repository}>{registration.repository}</ExternalLink>
              </Typography>
              <Typography>
                Config branch{' '}
                <ExternalLink href={getConfigBranchUrl(registration)}>
                  {getConfigBranch(registration.configBranch)}
                </ExternalLink>
              </Typography>
              <Typography>
                Config file <RadixConfigFileLink registration={registration} />
              </Typography>
              <Typography>To integrate with GitHub you must add a deploy key and a webhook</Typography>

              <div className="grid grid--gap-small">
                <Accordion className="accordion" chevronPosition="right">
                  <Accordion.Item>
                    <Accordion.Header>
                      <Accordion.HeaderTitle>
                        <Typography>Add deploy key</Typography>
                      </Accordion.HeaderTitle>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <ConfigureDeployKey deployKey={secrets} app={registration} />
                      <RegenerateDeployKeyScrim appName={registration.name} refetchSecrets={refetchSecrets} />
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>

                <Accordion chevronPosition="right">
                  <Accordion.Item>
                    <Accordion.Header>
                      <Accordion.HeaderTitle>
                        <Typography>Add webhook</Typography>
                      </Accordion.HeaderTitle>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <ConfigureGitHubWebhook
                        appName={registration.name}
                        repository={registration.repository}
                        sharedSecret={secrets?.sharedSecret}
                      />
                      <RegenerateSharedSecretScrim appName={registration.name} refetchSecrets={refetchSecrets} />
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
            </section>

            <section className="grid grid--gap-small">
              <Typography variant="h4">App Secrets</Typography>
              <ImageHubsAccordion appName={appName} />
              <BuildSecretsAccordion appName={appName} />
            </section>

            <section className="grid grid--gap-small">
              <Typography variant="h4">Danger Zone</Typography>
              <ChangeAdminForm registration={registration} refetch={refetch} />
              <ChangeRepositoryForm
                appName={appName}
                repository={registration.repository}
                sharedSecret={registration.sharedSecret}
                refetch={refetch}
              />
              <ChangeConfigBranchForm appName={appName} configBranch={registration.configBranch} refetch={refetch} />
              <ChangeConfigFileForm
                refetch={refetch}
                appName={appName}
                radixConfigFullName={registration.radixConfigFullName}
              />
              <ChangeConfigurationItemForm
                appName={appName}
                configurationItem={registration.configurationItem}
                refetch={refetch}
              />
              <DeleteApplicationForm appName={appName} />
            </section>
          </>
        )}
      </AsyncResource>
    </main>
  )
}
export default withRouteParams(PageConfiguration)
