import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { ScrimPopup } from '../../scrim-popup';
import { Code } from '../../code';
import { usePollPayload } from './use-poll-payload';
import { RequestState } from '../../../state/state-utils/request-states';

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
  const [payloadState, getPayloadState] = usePollPayload(
    appName,
    envName,
    jobComponentName,
    jobName
  );

  let payload = payloadState?.data ?? '';

  const [visibleScrim, setVisibleScrim] = useState(false);

  useEffect(() => {
    if (payloadState.status !== RequestState.SUCCESS) {
      return;
    }
  }, [payload, payloadState]);

  const showPayload = (): void => {
    getPayloadState();
    setVisibleScrim(true);
  };

  return (
    <>
      <div className="chart-percentage" onClick={() => showPayload()}>
        <Typography link>Payload</Typography>
      </div>
      <ScrimPopup
        title={`Payload for job: ${jobName}`}
        open={visibleScrim}
        onClose={() => setVisibleScrim(false)}
        isDismissable
      >
        <div className="payload-content">
          <Code copy download={false} autoscroll resizable>
            {payload}
          </Code>
        </div>
      </ScrimPopup>
    </>
  );
};

Payload.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<PayloadProps>;
