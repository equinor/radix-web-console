import type { Application } from '../../store/radix-api';

export function useGetApplicationBranches(application: Application) {
  return (
    application?.environments
      ?.filter(({ branchMapping }) => !!branchMapping)
      .reduce<Record<string, Array<string>>>(
        (obj, { branchMapping, name }) => ({
          ...obj,
          [branchMapping]: [...(obj[branchMapping] || []), name],
        }),
        {}
      ) ?? {}
  );
}
