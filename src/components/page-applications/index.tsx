import AppList from '../app-list'
import { DocumentTitle } from '../document-title'

import './style.css'

export default function PageApplications() {
  return (
    <div className="o-layout-single applications">
      <DocumentTitle title="Applications" />

      <AppList />
    </div>
  )
}
