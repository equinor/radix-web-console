import { usePatchJson } from '../../effects';

export const useSaveConfigurationItem = (appName) => {
  const path = `/applications/${appName}`;

  return usePatchJson(path, (newCI: string) => {
    return { configurationItem: newCI };
  });
};
