import { usePatchJson } from '../../effects';

const useSaveConfigBranch = (appName) => {
  const path = `/applications/${appName}`;

  return usePatchJson(path, (newConfigBranch) => {
    return {
      configBranch: newConfigBranch ? newConfigBranch.toString() : null,
    };
  });
};

export default useSaveConfigBranch;
