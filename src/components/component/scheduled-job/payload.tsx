import * as PropTypes from 'prop-types';

import { useFetchPayload } from './use-fetch-payload';

import { Code } from '../../code';

import './style.css';

export interface PayloadProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  jobName: string;
}

export const Payload = ({
  appName,
  envName,
  jobComponentName,
  jobName,
}: PayloadProps): JSX.Element => {
  const [payloadState] = useFetchPayload(
    appName,
    envName,
    jobComponentName,
    jobName
  );

  return (
    <div className="payload-content">
      <Code copy download={false} autoscroll resizable>
        {payloadState.data ?? ''}
      </Code>
    </div>
  );
};

Payload.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<PayloadProps>;
