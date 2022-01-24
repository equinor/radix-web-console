import { useFetchJson } from '../../effects';
import { ApplicationModel } from '../../models/application';

export const useGetApplication = (appName: string) =>
  useFetchJson<ApplicationModel>(
    `/applications/${encodeURIComponent(appName)}`
  );
