import { cloneDeep } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import requestStates from '../../state/state-utils/request-states';

const isAnyStateInProgress = (...states) =>
  states.some((state) => state === requestStates.IN_PROGRESS);

const buildReceiverSecrets = (receviers) => {
  const secretsConfig = {};
  if (!receviers) {
    return secretsConfig;
  }

  for (const [receiverName, receiver] of Object.entries(receviers)) {
    secretsConfig[receiverName] = {};
    if (receiver.slackConfig) {
      secretsConfig[receiverName]['slackConfig'] = { webhookUrl: undefined };
    }
  }

  return secretsConfig;
};

export const buildEditConfig = (config) => {
  return {
    alerts: cloneDeep(config.alerts),
    receivers: cloneDeep(config.receivers),
    receiverSecrets: buildReceiverSecrets(config.receivers),
  };
};

const buildSlackReceiverNamesFromConfig = (config) => {
  if (!config && !config.receivers) {
    return [];
  }
  return Object.entries(config.receivers)
    .filter((e) => e[1].slackConfig)
    .map((e) => e[0]);
};

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const useBuildEditConfig = (config) => {
  const [editConfig, setEditConfig] = useState();

  useEffect(() => {
    setEditConfig(buildEditConfig(config));
  }, [config]);

  return editConfig;
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
