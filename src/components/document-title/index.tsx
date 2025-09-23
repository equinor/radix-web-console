import type { FunctionComponent } from 'react'

import { configVariables } from '../../utils/config'

export const DocumentTitle: FunctionComponent<{ title: string }> = ({ title }) => {
  const appName = configVariables.APP_NAME
  document.title = title + (appName ? ` | ${appName}` : '')
  return <></>
}
