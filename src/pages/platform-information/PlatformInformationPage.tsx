import { Typography } from '@equinor/eds-core-react'
import { clsx } from 'clsx'
import { DocumentTitle } from '../../components/document-title'
import { AvailabilityOverview } from './components/availability/AvailabilityOverview'
import { ConfigList } from './components/config-list/ConfigList'
import styles from './platformInformationPage.module.css'

export const PlatformInformationPage = () => {
  return (
    <div className={clsx('o-layout-single', styles.page)}>
      <div className="o-layout-single__head">
        <DocumentTitle title={'Platform information'} />
        <Typography variant="h2" as="h1">
          Platform Information
        </Typography>
      </div>
      <div className="o-layout-single__content">
        <div className={clsx('panel grid grid--gap-x-large', styles.content)}>
          <section className="grid grid--gap-medium">
            <Typography variant="h4" as="h2">
              Availability
            </Typography>
            <AvailabilityOverview />
          </section>

          <section className="grid grid--gap-medium">
            <Typography variant="h4" as="h2">
              Configuration
            </Typography>
            <Typography>
              Network and identity details for this platform. Use them when configuring external services, for example,
              allow-listing the egress IPs in a firewall or setting up federated credentials with the OIDC issuers.
            </Typography>
            <ConfigList />
          </section>
        </div>
      </div>
    </div>
  )
}
