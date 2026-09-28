import { DocumentTitle } from '../../components/document-title'
import { ApplicationsOverview } from './components/applications-overview/ApplicationsOverview'

import './style.css'

export default function ApplicationsPage() {
  return (
    <div className="o-layout-single applications">
      <DocumentTitle title="Applications" />
      <ApplicationsOverview />
    </div>
  )
}
