import { pollingInterval } from '../../store/defaults';
import {
  useGetApplicationQuery,
  useGetEnvironmentSummaryQuery,
} from '../../store/radix-api';

export function useGetApplicationBranches(
  appName: string
): Record<string, string[]> {
  const { data: envSummary } = useGetEnvironmentSummaryQuery(
    { appName },
    { pollingInterval }
  );
  const { data: application } = useGetApplicationQuery(
    { appName },
    { pollingInterval }
  );

  const branches =
    envSummary
      ?.filter((x) => !x.branchMapping)
      .reduce(
        (obj, { branchMapping, name }) => ({
          ...obj,
          [branchMapping!]: [...(obj[branchMapping!] || []), name],
        }),
        {}
      ) ?? {};

  if (Object.keys(branches).length === 0 && envSummary?.length === 0) {
    const configBranch = application?.registration?.configBranch;
    if (configBranch) {
      branches[configBranch] = [];
    }
  }
  return branches;
}
