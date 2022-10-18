import { Observable } from 'rxjs';

import { createRadixApiUrl } from '../../api/api-config';
import { ajaxGet, ajaxPost } from '../../api/api-helpers';
import { makeUrl as makeUrlApps } from '../../api/resource-applications';
import { makeUrl as makeUrlAppSearch } from '../../api/resource-applicationsearch';
import { bindPolling } from '../../effects/bind-polling';
import { AsyncState } from '../../effects/effect-types';
import { ApplicationSummaryModel } from '../../models/application-summary';
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
    createRadixApiUrl(makeUrlApps())
  );
}

function getApplicationsByNamesRequest(
  appNames: Array<string>,
  { includeLatestJobSummary = false, includeActiveDeployments = false }
): Observable<AsyncState<Array<ApplicationSummaryModel>>> {
  return appNames?.length > 0
    ? ajaxPost<Array<ApplicationSummaryModel>>(
        createRadixApiUrl(makeUrlAppSearch()),
        {
          names: appNames,
          includeFields: {
            jobSummary: includeLatestJobSummary,
            activeDeployments: includeActiveDeployments,
          },
        }
      )
    : new Observable((subscriber) => {
        // deliver default object if there are no appNames to query
        subscriber.next({
          ...defaultRequestValue,
          ...{ status: RequestState.SUCCESS },
        });
        subscriber.complete();
      });
}

export function pollApplications() {
  const requestFactory = getApplicationsRequest;
  return bindPolling(requestFactory, defaultRequestValue);
}

export function pollApplicationsByNames() {
  const requestFactory = getApplicationsByNamesRequest;
  return bindPolling(requestFactory, defaultRequestValue);
}
