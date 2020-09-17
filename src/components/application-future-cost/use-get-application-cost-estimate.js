import { useFetchCostJson } from '../../effects'

const useGetApplicationCostEstimate = (appName) => {
  const encAppName = encodedURIComonent(appName);
  const path = `/futurecost/${encAppName}`;

  return useFetchCostJson(path);
};

  export default useGetApplicationCostEstimate;
