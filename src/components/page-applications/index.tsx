import { FunctionComponent } from 'react';

import { pollApplications, pollApplicationsByNames } from './poll-applications';

import AppList from '../app-list';

import './style.css';

const [usePollApplications] = pollApplications();
const [usePollApplicationsByNames] = pollApplicationsByNames();

export const PageApplications: FunctionComponent = () => (
  <div className="o-layout-single applications">
    <AppList
      pollApplications={usePollApplications}
      pollApplicationsByNames={usePollApplicationsByNames}
    />
  </div>
);

export default PageApplications;
