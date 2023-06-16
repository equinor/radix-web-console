import { Observable } from 'rxjs';

import { createRadixApiUrl } from '../../api/api-config';
import { ajaxGet, ajaxPost } from '../../api/api-helpers';
import { bindPolling } from '../../effects/bind-polling';
import { AsyncState } from '../../effects/effect-types';
import { ApplicationSummaryModel } from '../../models/radix-api/applications/application-summary';
import { routes } from '../../routes';
import { RequestState } from '../../state/state-utils/request-states';

const defaultRequestValue: AsyncState<Array<ApplicationSummaryModel>> = {
  status: RequestState.IN_PROGRESS,
  data: null,
  error: null,
};

function getApplicationsRequest(): Observable<
  AsyncState<Array<ApplicationSummaryModel>>
> {
  return ajaxGet<Array<ApplicationSummaryModel>>(
    createRadixApiUrl(routes.apps)
  );
}

function getApplicationsByNamesRequest(
  appNames: Array<string>,
  {
    includeLatestJobSummary = false,
    includeEnvironmentActiveComponents = false,
  }
): Observable<AsyncState<Array<ApplicationSummaryModel>>> {
  return appNames?.length > 0
    ? ajaxPost<Array<ApplicationSummaryModel>>(
        createRadixApiUrl(routes.appsSearch),
        {
          names: appNames,
          includeFields: {
            latestJobSummary: includeLatestJobSummary,
            environmentActiveComponents: includeEnvironmentActiveComponents,
          },
        }
      )
    : new Observable((subscriber) => {
        // return a default object if there are no appNames in the query
        subscriber.next({
          ...defaultRequestValue,
          status: RequestState.SUCCESS,
        });
        subscriber.complete();
      });
}

export function pollApplications(): ReturnType<
  typeof bindPolling<
    AsyncState<Array<ApplicationSummaryModel>>,
    Parameters<typeof getApplicationsRequest>
  >
> {
  const requestFactory = getApplicationsRequest;
  return bindPolling(requestFactory, { ...defaultRequestValue });
}

export function pollApplicationsByNames(): ReturnType<
  typeof bindPolling<
    AsyncState<Array<ApplicationSummaryModel>>,
    Parameters<typeof getApplicationsByNamesRequest>
  >
> {
  const requestFactory = getApplicationsByNamesRequest;
  return bindPolling(requestFactory, { ...defaultRequestValue });
}
