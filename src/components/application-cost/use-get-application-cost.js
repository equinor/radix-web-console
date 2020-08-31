import { useFetchCostJson } from '../../effects';

const useGetApplicationCost = (appName, dateFrom, dateTo) => {
  const encAppName = encodeURIComponent(appName);
  const path = `/totalcost/${encAppName}?fromTime=${dateFrom}&toTime=${dateTo}`;

  return useFetchCostJson(path);
};

export default useGetApplicationCost;
