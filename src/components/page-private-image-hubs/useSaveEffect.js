import { useEffect, useState } from 'react';

import { saveImageHubSecret } from '../../api/private-image-hubs';
import requestStates from '../../state/state-utils/request-states';

const useSaveEffect = (appName, imageHubName, newValue) => {
  const [saveState, setSaveState] = useState(requestStates.IDLE);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    setSaveState(requestStates.IN_PROGRESS);
    saveImageHubSecret(appName, imageHubName, newValue)
      .then(() => setSaveState(requestStates.SUCCESS))
      .catch(err => {
        setSaveState(requestStates.ERROR);
        setSaveError(err.toString());
      });
  }, [appName, imageHubName, newValue]);

  return { saveState, saveError };
};

export default useSaveEffect;
