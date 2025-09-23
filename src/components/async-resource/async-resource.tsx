import { CircularProgress, Typography } from '@equinor/eds-core-react'
import { type PropsWithChildren, type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { externalUrls } from '../../externalUrls'
import { routes } from '../../routes'
import type { FetchQueryResult } from '../../store/types'
import { getFetchErrorData } from '../../store/utils/parse-errors'
import { Alert } from '../alert'
import { ExternalLink } from '../link/external-link'

type AnotherAsyncResourceProps = PropsWithChildren<{
  asyncState: Pick<FetchQueryResult, 'error' | 'isError' | 'isLoading'>
  loadingContent?: false | Exclude<ReactNode, true>
  errorContent?: false | Exclude<ReactNode, true>
  nonFailureErrorCodes?: Array<number | string>
}>

export default function AsyncResource({
  asyncState,
  children,
  loadingContent,
  errorContent,
  nonFailureErrorCodes: nonErrorCodes,
}: AnotherAsyncResourceProps) {
  const { code, message, action } = asyncState?.error ? getFetchErrorData(asyncState.error) : {}

  const navigate = useNavigate()

  useEffect(() => {
    if (action !== 'refresh_msal_auth') {
      return
    }

    navigate(routes.sessionExpired, { replace: true })
  }, [action, navigate])

  if (!asyncState || asyncState.isLoading) {
    return (
      <UseContentOrDefault
        content={loadingContent}
        defaultContent={
          <span>
            <CircularProgress size={16} /> Loading…
          </span>
        }
      />
    )
  }

  if (!asyncState.isError || nonErrorCodes?.includes(code ?? '')) {
    return children
  }

  return (
    <UseContentOrDefault
      content={errorContent}
      defaultContent={
        <Alert type="danger">
          <Typography variant="h4">That didn't work 😞</Typography>
          <div className="grid grid--gap-small">
            <div>
              <Typography variant="caption">Error message:</Typography>
              <samp className="word-break">{[code, message].filter((x) => !!x).join(': ')}</samp>
            </div>
            <Typography>
              You may want to refresh the page. If the problem persists, get in touch on our Slack{' '}
              <ExternalLink href={externalUrls.slackRadixSupport}>support channel</ExternalLink>
            </Typography>
          </div>
        </Alert>
      }
    />
  )
}

type LoadingComponentProps = {
  content?: ReactNode
  defaultContent: ReactNode
}

function UseContentOrDefault({ content, defaultContent }: LoadingComponentProps): ReactNode {
  if (content === false) {
    return null
  }

  if (content) {
    return <>{content}</>
  }

  return defaultContent
}
