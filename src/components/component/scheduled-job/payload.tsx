import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { useFetchPayload } from './use-fetch-payload';

import { Code } from '../../code';

import './style.css';

export interface PayloadProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  jobName: string;
}

export const Payload: FunctionComponent<PayloadProps> = ({
  appName,
  envName,
  jobComponentName,
  jobName,
}) => {
  const [{ data }] = useFetchPayload(
    appName,
    envName,
    jobComponentName,
    jobName
  );

  return (
    <div className="payload-content">
      <Code copy autoscroll resizable>
        {data ?? ''}
      </Code>
    </div>
  );
};

Payload.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
};
