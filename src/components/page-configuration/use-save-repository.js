import { usePatchJson } from '../../effects';

const useSaveRepository = (appName) => {
  const path = `/applications/${appName}`;

  return usePatchJson(path, (newUrl) => {
    return { repository: newUrl ? newUrl.toString() : null };
  });
};

export default useSaveRepository;
