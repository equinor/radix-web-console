import { Icon, Typography } from '@equinor/eds-core-react'
import { email, github, group, type IconData, slack } from '@equinor/eds-icons'
import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { DocumentTitle } from '../../components/document-title'
import { ExternalLink } from '../../components/link/external-link'
import { externalUrls } from '../../externalUrls'
import styles from './supportPage.module.css'

interface SupportSectionProps {
  readonly icon: IconData
  readonly title: string
  readonly children: ReactNode
}

const SupportSection = (props: SupportSectionProps) => {
  const { icon, title, children } = props

  return (
    <section className="grid grid--gap-small">
      <div className="grid grid--gap-small grid--auto-columns grid--align-center">
        <Icon data={icon} />
        <Typography variant="h4" as="h2">
          {title}
        </Typography>
      </div>
      <Typography className={styles.sectionContent}>{children}</Typography>
    </section>
  )
}

export const SupportPage = () => {
  return (
    <div className={clsx('o-layout-single', styles.page)}>
      <div className="o-layout-single__head">
        <DocumentTitle title={'Support'} />
        <Typography variant="h2" as="h1">
          Support
        </Typography>
      </div>
      <div className="o-layout-single__content">
        <div className={clsx('panel grid grid--gap-x-large', styles.content)}>
          <Typography variant="body_long" className={styles.intro}>
            We're happy to hear from you. Whether you have a question, need a hand, or want to share an idea, here's how
            to reach the Radix team.
          </Typography>

          <SupportSection icon={slack} title="Chat with us on Slack">
            The quickest way to get help. Drop by our{' '}
            <ExternalLink href={externalUrls.slackRadixSupport}>support channel</ExternalLink> and we'll get back to
            you.
          </SupportSection>

          <SupportSection icon={github} title="Report a bug or request a feature">
            Found something that isn't working, or have an idea to make Radix better? Let us know on{' '}
            <ExternalLink href={externalUrls.radixGithubFeedback}>GitHub</ExternalLink>.
          </SupportSection>

          <SupportSection icon={email} title="Send us an email">
            Prefer email? Reach us at{' '}
            <ExternalLink href={'mailto:' + externalUrls.radixSupportEmail} icon={null}>
              {externalUrls.radixSupportEmail}
            </ExternalLink>
            .
          </SupportSection>

          <SupportSection icon={group} title="Meet the team">
            Curious who's behind Radix? Put faces to the names and find all the ways to reach us on our{' '}
            <ExternalLink href={externalUrls.community}>community page</ExternalLink>.
          </SupportSection>
        </div>
      </div>
    </div>
  )
}
