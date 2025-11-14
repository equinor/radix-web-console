import { Typography } from '@equinor/eds-core-react'

import { ConfigList } from '../config-list'
import { AvailabilityCharts } from '../data-chart'
import { DocumentTitle } from '../document-title'

export default function PageAbout() {
  return (
    <div className="o-layout-single">
      <div className="o-layout-single__head">
        <DocumentTitle title={'About'} />
        <Typography variant="body_short_bold">About</Typography>
      </div>
      <div className="o-layout-single__content">
        <div className="panel grid grid--gap-small">
          <Typography variant="overline">
            Radix Web Console [{import.meta.env.PACKAGE_NAME}@{import.meta.env.PACKAGE_VERSION}]
          </Typography>
          <AvailabilityCharts />
          <br />
          <Typography variant="h4">Configuration</Typography>
          <ConfigList />
        </div>
      </div>
    </div>
  )
}
