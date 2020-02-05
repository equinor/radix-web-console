import { usePatchJson } from '../../effects';

const useSaveOwner = (appName, newOwner) => {
  const path = `/applications/${appName}`;
  const data = { owner: newOwner ? newOwner.toString() : null };

  return usePatchJson(path, data);
};

export default useSaveOwner;
