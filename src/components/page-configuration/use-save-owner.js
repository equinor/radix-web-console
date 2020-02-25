import { usePatchJson } from '../../effects';

const useSaveOwner = appName => {
  const path = `/applications/${appName}`;

  return usePatchJson(path, newOwner => {
    return { owner: newOwner ? newOwner.toString() : null };
  });
};

export default useSaveOwner;
