import { useEffect, useState } from 'react';
import requestStates from '../../state/state-utils/request-states';

const isAnyStateInProgress = (...states) =>
  states.some((state) => state === requestStates.IN_PROGRESS);

const buildSlackReceiverNamesFromConfig = (config) => {
  if (!config && !config.receivers) {
    return [];
  }

  return Object.entries(config.receivers)
    .filter((e) => e[1].slackConfig)
    .map((e) => e[0]);
};

export const useBuildSlackReceiverNames = (config) => {
  const [slackReceivers, setSlackReceivers] = useState([]);

  useEffect(
    () => setSlackReceivers(buildSlackReceiverNamesFromConfig(config)),
    [config]
  );

  return slackReceivers;
};

export const useIsSaving = (...states) => {
  const [isSaving, setIsSaving] = useState(false);
  useEffect(
    () => setIsSaving(isAnyStateInProgress(...states)),
    [states, setIsSaving]
  );

  return isSaving;
};
